'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const scaleX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scaleX.set(progress);
  }, [progress, scaleX]);

  return (
    <motion.div
      className="scroll-progress w-full"
      style={{
        scaleX,
        transformOrigin: 'left',
      }}
    />
  );
}
