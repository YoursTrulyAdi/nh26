"use client";

import React, { useRef } from 'react';
import TiltedCard from './TiltedCard';
import { motion, useInView } from 'framer-motion';

const Sponsors2 = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section ref={sectionRef} className="w-full py-20 relative flex flex-col items-center justify-center bg-[#010524ff]">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-[#f17575ff] mb-12 z-30 relative font-['PPMori'] tracking-tight">
        <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
          Our Sponsors
        </span>
      </h2>

      <div className="relative group cursor-pointer">
        <motion.div
          className="pointer-events-none"
          initial={{ x: -140, y: -140, rotate: -65, opacity: 0 }}
          animate={isInView ? { x: 0, y: 0, rotate: -45, opacity: 1 } : { x: -140, y: -140, rotate: -65, opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 55, damping: 11, mass: 1.5 },
            y: { type: "spring", stiffness: 55, damping: 11, mass: 1.5 },
            rotate: { type: "spring", stiffness: 70, damping: 10 },
            opacity: { duration: 0.25, ease: "easeIn" }
          }}
          style={{
            position: 'absolute',
            top: 18,
            left: -30,
            width: 110,
            padding: '5px 0',
            background: '#E8344E',
            color: 'white',
            fontSize: '9px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textAlign: 'center',
            textTransform: 'uppercase',
            transformOrigin: 'center center',
            zIndex: 20,
            boxShadow: '0 3px 10px rgba(232, 52, 78, 0.5)',
          }}
        >
          COMMUNITY PARTNER
        </motion.div>

        <a href="https://devfolio.co/" target="_blank" rel="noopener noreferrer">
          <TiltedCard
            imageSrc="/assets/Devfolio.png"
            altText="Devfolio Logo"
            containerHeight="120px"
            containerWidth="240px"
            imageHeight="120px"
            imageWidth="240px"
            imageClassName="p-5 right-0 bottom-0 m-auto inset-0 object-center"
            scaleOnHover={1}
            rotateAmplitude={15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
            tiltedClassName="border-[3px] border-red-600/40 rounded-[20px] bg-red-950/20 backdrop-blur-sm shadow-[0_4px_20px_rgba(255,0,0,0.1)] group-hover:border-red-500 group-hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] transition-colors transition-shadow duration-300 relative overflow-hidden"
          />
        </a>
      </div>
    </section>
  );
};

export default Sponsors2;
