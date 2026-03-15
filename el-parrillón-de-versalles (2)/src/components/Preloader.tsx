import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds preloader
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-carbon flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-grill-red mb-4"
          >
            <Flame size={64} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl text-beige font-display tracking-wider text-center px-4"
          >
            EL PARRILLÓN DE VERSALLES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-wood text-sm mt-2 uppercase tracking-widest"
          >
            Encendiendo los fuegos...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
