"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // 1. Initialize Lenis with optimized settings for extremely smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      mouseMultiplier: 1,
      smoothTouch: true, // Enable smooth scrolling on touch devices
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    // 2. Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP Ticker to Lenis
    // This ensures that GSAP animations are in sync with Lenis scrolling
    const tickerFunction = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerFunction);

    // 4. Disable GSAP lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFunction);
    };
  }, []);

  return null;
};

export default SmoothScroll;
