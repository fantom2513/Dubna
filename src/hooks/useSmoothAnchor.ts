import { useNavigate, useLocation } from 'react-router-dom';
import { getLenis } from '@/lib/lenis';

export function useSmoothAnchor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (hash: string, offset = -80) => {
    const scrollToHash = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(hash, { offset, duration: 1.2 });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (pathname === '/') {
      scrollToHash();
    } else {
      navigate('/');
      setTimeout(scrollToHash, 400);
    }
  };
}
