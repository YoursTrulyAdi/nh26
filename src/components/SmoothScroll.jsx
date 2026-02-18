"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

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
