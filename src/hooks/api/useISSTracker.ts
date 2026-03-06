import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as satellite from 'satellite.js';

export interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface NextPass {
  riseTime: Date;
  maxElevationDeg: number;
  durationMin: number;
  minutesAway: number;
}

export interface ISSData {
  position: ISSPosition;
  nextPass: NextPass | null;
}

// Dubna observer location
const DUBNA_LAT_DEG = 56.74;
const DUBNA_LON_DEG = 37.17;
const DUBNA_HEIGHT_KM = 0.13;

// Fallback TLE for ISS (2025 epoch)
const FALLBACK_TLE_LINE1 = '1 25544U 98067A   25060.50000000  .00020000  00000-0  35000-3 0  9999';
const FALLBACK_TLE_LINE2 = '2 25544  51.6400 100.0000 0001234  90.0000 270.0000 15.49500000000000';

function computeNextPass(tleLine1: string, tleLine2: string): NextPass | null {
  try {
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    const observerGd = {
      longitude: satellite.degreesToRadians(DUBNA_LON_DEG),
      latitude: satellite.degreesToRadians(DUBNA_LAT_DEG),
      height: DUBNA_HEIGHT_KM,
    };

    const now = new Date();
    let riseTime: Date | null = null;
    let maxElevation = 0;
    let setTime: Date | null = null;
    let inPass = false;

    // Search up to 24 hours ahead, in 30-second increments
    for (let minuteOffset = 0; minuteOffset < 1440; minuteOffset += 0.5) {
      const checkTime = new Date(now.getTime() + minuteOffset * 60_000);
      const posVel = satellite.propagate(satrec, checkTime);

      if (!posVel || !posVel.position || typeof posVel.position === 'boolean') continue;
      const gmst = satellite.gstime(checkTime);
      const posGd = satellite.eciToGeodetic(posVel.position as satellite.EciVec3<number>, gmst);
      const lookAngles = satellite.ecfToLookAngles(observerGd, satellite.geodeticToEcf(posGd));
      const elevDeg = satellite.radiansToDegrees(lookAngles.elevation);

      if (elevDeg > 10) {
        if (!inPass) {
          inPass = true;
          riseTime = checkTime;
        }
        if (elevDeg > maxElevation) maxElevation = elevDeg;
      } else if (inPass) {
        setTime = checkTime;
        break;
      }
    }

    if (!riseTime) return null;

    const durationMin = setTime
      ? (setTime.getTime() - riseTime.getTime()) / 60_000
      : 5;
    const minutesAway = (riseTime.getTime() - now.getTime()) / 60_000;

    return {
      riseTime,
      maxElevationDeg: Math.round(maxElevation),
      durationMin: Math.round(durationMin),
      minutesAway: Math.max(0, minutesAway),
    };
  } catch {
    return null;
  }
}

async function fetchTLE(): Promise<{ line1: string; line2: string }> {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=' +
      encodeURIComponent('https://celestrak.org/COMP/TLE/table.php?GROUP=stations&FORMAT=tle');
    const { data } = await axios.get<string>(proxyUrl, { responseType: 'text', timeout: 8000 });
    const lines = data.split('\n').map((l: string) => l.trim()).filter(Boolean);
    // Find ISS (ZARYA)
    const issIdx = lines.findIndex((l: string) => l.includes('ISS') || l.includes('ZARYA'));
    if (issIdx >= 0 && lines[issIdx + 1] && lines[issIdx + 2]) {
      return { line1: lines[issIdx + 1], line2: lines[issIdx + 2] };
    }
  } catch {
    // fall through to fallback
  }
  return { line1: FALLBACK_TLE_LINE1, line2: FALLBACK_TLE_LINE2 };
}

async function fetchISSPosition(): Promise<ISSPosition> {
  const { data } = await axios.get<ISSPosition>(
    'https://api.wheretheiss.at/v1/satellites/25544',
    { timeout: 5000 }
  );
  return data;
}

export function useISSTracker() {
  // TLE query — fetched once per hour, not every 3 seconds
  const tleQuery = useQuery({
    queryKey: ['iss-tle'],
    queryFn: fetchTLE,
    staleTime: 3_600_000,
    refetchInterval: 3_600_000,
  });

  // Position query — updates every 3 seconds
  const positionQuery = useQuery({
    queryKey: ['iss-position'],
    queryFn: fetchISSPosition,
    refetchInterval: 3_000,
    staleTime: 0,
  });

  // Compute next pass only when TLE changes (expensive calculation)
  const nextPass = useMemo(() => {
    if (!tleQuery.data) return null;
    return computeNextPass(tleQuery.data.line1, tleQuery.data.line2);
  }, [tleQuery.data]);

  const data: ISSData | undefined = positionQuery.data
    ? { position: positionQuery.data, nextPass }
    : undefined;

  return {
    data,
    isLoading: positionQuery.isLoading,
    error: positionQuery.error,
    refetch: positionQuery.refetch,
  };
}
