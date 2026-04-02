"use client";
import { CldImage } from 'next-cloudinary';


import React from 'react';
import Navbar from './Navbar';

import { useEffect, useRef } from "react";


const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);
  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center justify-center relative p-4 md:p-8 overflow-hidden">
      <a
        id="mlh-trust-badge"
        className="block absolute z-[9999] transition-all duration-300 right-10 top-[72px] md:right-4 md:top-0 lg:right-10 lg:top-0 w-[10%] min-w-[60px] max-w-[100px]"
        href="https://mlh.io/apac?utm_source=apac-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
          alt="Major League Hacking 2026 Hackathon Season"
          className="w-full"
        />
      </a>
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/poster-bg.jpg"
          className="w-full h-full object-cover opacity-95"
        >
          <source src="/assets/compressed-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability - darkened */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* Outer Glow/Border Effect (Optional, staying strict B&W so just a border) */}
      <div className="w-[90vw] md:w-[80vw] lg:max-w-5xl xl:w-full xl:max-w-[95vw] min-h-[60vh] md:min-h-[80vh] xl:min-h-[85vh] rounded-[3rem] xl:rounded-3xl flex flex-col items-center relative overflow-visible mt-8 md:mt-0 transition-all duration-300">

        {/* Navbar positioned to overlap top border */}
        {/* Navbar moved to page.js */}



        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 xl:space-y-6 z-10 p-4 pt-24 md:pt-24 xl:pt-32 pb-12 xl:pb-10 w-full h-full justify-center my-auto xl:my-0 xl:justify-start reveal-container">

          {/* Logo */}
          <div className="mb-2 md:mb-4 xl:mb-4 reveal-item">
            <CldImage
              src="hero_logo_wjbqzf"
              alt="NMIT Hacks Logo"
              width={500}
              height={200}
              className="h-24 md:h-36 lg:h-44 xl:h-40 w-auto object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(6320%) hue-rotate(356deg) brightness(93%) contrast(118%)" }}
            />
          </div>

          {/* Powered by GitHub - Title Sponsor */}
          <div className="flex items-center gap-3 reveal-item mb-4 opacity-90 group transition-all duration-300 hover:opacity-100">
            <span className="text-white/70 text-sm md:text-lg font-['PPMori'] tracking-wide">
              Powered by
            </span>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 flex items-center shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/20">
              <img 
                src="/assets/GitHub.png" 
                alt="GitHub" 
                className="h-5 md:h-7 w-auto object-contain" 
              />
            </div>
          </div>





          {/* Details */}
          <div className="space-y-2 md:space-y-4 xl:space-y-3 pt-4 md:pt-2 xl:pt-6 reveal-item">
            <p className="text-xl md:text-3xl   lg:text-4xl xl:text-3xl text-[#ff0000] font-bold tracking-wide font-['PPMori'] px-2 mb-4 md:mb-6 mt-2 md:mt-4">
              National-Level 48-Hours Hackathon
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-2xl font-bold text-[#f17575ff] tracking-widest uppercase">
              8th - 10th May, 2026
            </p>
          </div>

          {/* Organization */}
          <div className="text-base md:text-xl lg:text-2xl xl:text-xl text-white font-bold reveal-item px-4">
            <p className="tracking-wide">Organized by</p>
            <p className="text-white mt-1 md:mt-2 xl:mt-1 font-['PPMori'] font-bold">Department of Computer Science and Engineering</p>
            <p className="text-white text-sm md:text-lg lg:text-xl xl:text-lg mt-1 md:mt-2 xl:mt-1 font-bold tracking-widest">Nitte University, Bangalore campus</p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 md:pt-0 xl:pt-0 reveal-item flex flex-col items-center">
            <div
              className="apply-button"
              data-hackathon-slug="nmithacks26"
              data-button-theme="dark-inverted"
              style={{ height: "44px", width: "312px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
