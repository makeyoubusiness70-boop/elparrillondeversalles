import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatProps> = ({ end, label, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
          // Ease out effect
          const easeProgress = 1 - Math.pow(1 - progress / duration, 3);
          setCount(Math.floor(end * easeProgress));
          animationFrame = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      setCount(0);
    }
  }, [end, duration, isInView]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-5xl md:text-6xl font-display text-grill-red mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-gray-300 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default function Statistics() {
  return (
    <section className="py-16 bg-carbon text-beige border-y border-gray-800 relative overflow-hidden">
      {/* Background pattern or subtle texture could go here */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#d32f2f 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <StatCounter end={10} label="Años de Tradición" suffix="+" />
          <StatCounter end={600} label="Reseñas Positivas" suffix="+" />
          <StatCounter end={5000} label="Clientes Satisfechos" suffix="+" />
        </div>
      </div>
    </section>
  );
}
