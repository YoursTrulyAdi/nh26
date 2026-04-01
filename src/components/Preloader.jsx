'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      // Add slight easing to the progress calculation for a more natural feel
      const easeOutStep = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(easeOutStep * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
        }, 400); // Small pause at 100% before exiting
      }
    }, interval);

    return () => {
        clearInterval(timer);
        document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
           }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#010524ff] text-white overflow-hidden"
        >
          {/* Subtle grid background for tech feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

          {/* Animated Ripple Grid Squares */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to right, transparent 1px, black 1px), linear-gradient(to bottom, transparent 1px, black 1px)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 1px, black 1px), linear-gradient(to bottom, transparent 1px, black 1px)',
              maskSize: '24px 24px',
              WebkitMaskSize: '24px 24px',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px]"
              style={{ background: 'radial-gradient(circle, transparent 38%, rgba(255,0,0,0.8) 50%, transparent 62%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px]"
              style={{ background: 'radial-gradient(circle, transparent 38%, rgba(255,0,0,0.8) 50%, transparent 62%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px]"
              style={{ background: 'radial-gradient(circle, transparent 38%, rgba(255,0,0,0.8) 50%, transparent 62%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px]"
              style={{ background: 'radial-gradient(circle, transparent 38%, rgba(255,0,0,0.8) 50%, transparent 62%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.8 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px]"
              style={{ background: 'radial-gradient(circle, transparent 38%, rgba(255,0,0,0.8) 50%, transparent 62%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2.4 }}
            />
          </div>

          {/* Central Animated Content */}
          <div className="relative flex flex-col items-center z-10 p-8 w-full max-w-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10 flex items-center justify-center gap-3"
            >
              {/* Logo */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#ff0000] blur-[40px] opacity-20 rounded-full animate-pulse scale-150"></div>
                <Image 
                  src="/assets/navbar logo.png" 
                  alt="Nexora Logo" 
                  width={300} 
                  height={100} 
                  className="relative z-10 object-contain h-12 md:h-16 w-auto drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                  priority
                />
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/10 overflow-hidden relative rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f17575ff] to-[#ff0000] shadow-[0_0_10px_#ff0000]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Loading text with glitch/pulse effect */}
            <div className="mt-5 flex justify-between w-full text-[10px] tracking-[0.2em] text-gray-400 font-mono uppercase relative">
              <motion.span
                 animate={{ opacity: [0.3, 1, 0.3] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                Initializing Sequence
              </motion.span>
              <span className="font-semibold text-white/80">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
