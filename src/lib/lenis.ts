import type Lenis from 'lenis';

let _lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return _lenis;
}

export function setLenis(l: Lenis | null): void {
  _lenis = l;
}
