"use client";

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Starfield from './ui/Starfield';

const DEFAULT_PARTICLE_COUNT = 3;
const ACCENT_RGB = '255, 215, 0';

const mlhLeagueData = [
  { title: 'Backboard',    image: '/assets/MLH-league/backboard.png',      alt: 'Backboard Logo' },
  { title: 'ElevenLabs',   image: '/assets/MLH-league/elevenlabs.png',     alt: 'ElevenLabs Logo' },
  { title: 'Google Cloud', image: '/assets/MLH-league/google_cloud.png',   alt: 'Google Cloud Logo' },
  { title: 'Snowflake',    image: '/assets/MLH-league/snowflake_logo.png', alt: 'Snowflake Logo' },
  { title: 'Solana',       image: '/assets/MLH-league/solana.png',         alt: 'Solana Logo' },
  { title: 'Vultr',        image: '/assets/MLH-league/vultr_logo.png',     alt: 'Vultr Logo' },
  { title: 'MongoDB',      image: '/assets/MLH-league/mongodb_logo.png',   alt: 'MongoDB Logo' },
];

/* ─── Particle card (100% client-only DOM manipulation – no hydration risk) ─── */
const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = ACCENT_RGB,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef              = useRef(null);
  const particlesRef         = useRef([]);
  const timeoutsRef          = useRef([]);
  const isHoveredRef         = useRef(false);
  const memoizedParticles    = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismRef         = useRef(null);

  const mkParticle = useCallback((x, y) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;width:4px;height:4px;border-radius:50%;
      background:rgba(${glowColor},1);box-shadow:0 0 6px rgba(${glowColor},0.6);
      pointer-events:none;z-index:100;left:${x}px;top:${y}px;
    `;
    return el;
  }, [glowColor]);

  const initParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      mkParticle(Math.random() * width, Math.random() * height)
    );
    particlesInitialized.current = true;
  }, [particleCount, mkParticle]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) });
    });
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initParticles();
    memoizedParticles.current.forEach((p, i) => {
      const tid = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = p.cloneNode(true);
        clone.style.background    = `rgba(${glowColor},1)`;
        clone.style.boxShadow     = `0 0 6px rgba(${glowColor},0.6)`;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random()-.5)*100, y: (Math.random()-.5)*100, rotation: Math.random()*360, duration: 2+Math.random()*2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(tid);
    });
  }, [initParticles, glowColor]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      spawnParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };
    const onLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      if (enableTilt)     gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };
    const onMove = e => {
      if (!enableTilt && !enableMagnetism) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2,       cy = r.height / 2;
      if (enableTilt)
        gsap.to(el, { rotateX: ((y-cy)/cy)*-10, rotateY: ((x-cx)/cx)*10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism)
        magnetismRef.current = gsap.to(el, { x: (x-cx)*0.05, y: (y-cy)*0.05, duration: 0.3, ease: 'power2.out' });
    };
    const onClick = e => {
      if (!clickEffect) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const d = Math.max(Math.hypot(x,y), Math.hypot(x-r.width,y), Math.hypot(x,y-r.height), Math.hypot(x-r.width,y-r.height));
      const rpl = document.createElement('div');
      rpl.style.cssText = `position:absolute;width:${d*2}px;height:${d*2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x-d}px;top:${y-d}px;pointer-events:none;z-index:1000;`;
      el.appendChild(rpl);
      gsap.fromTo(rpl, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => rpl.remove() });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('click',      onClick);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('click',      onClick);
      clearParticles();
    };
  }, [spawnParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-visible`} style={{ position: 'relative' }}>
      {children}
    </div>
  );
};

/* ─── Main section ─── */
const MLHLeague = ({
  enableStars      = true,
  disableAnimations = false,
  particleCount    = DEFAULT_PARTICLE_COUNT,
  enableTilt       = true,
  clickEffect      = true,
  enableMagnetism  = true,
}) => {
  const gridRef = useRef(null);

  // Self-contained scroll-reveal: animates cards as they enter the viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll('.mlh-card-wrap');
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 30, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.12,
        clearProps: 'transform,scale',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }, []);

  return (
  <section className="w-full py-20 bg-[#010524] relative overflow-hidden">
    {/* Background */}
    <Starfield />
    <div className="absolute inset-0 bg-gradient-to-b from-[#010524] via-transparent to-[#010524] z-0 pointer-events-none opacity-80" />

    {/* All styles are pure static CSS – no JS interpolation → no hydration mismatch */}
    <style>{`
      /* ── grid ── */
      .mlh-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 1.5rem;
        justify-items: center;
      }

      /* 7th card alone in 3rd row → center it (column 2 of 3) */
      .mlh-card-wrap:last-child:nth-child(3n + 1) {
        grid-column: 2;
      }

      /* ── tablet: 2 columns ── */
      @media (max-width: 1024px) {
        .mlh-grid { grid-template-columns: repeat(2, 1fr); }
        /* 7th card alone in last row of 2-col grid → span both columns, center */
        .mlh-card-wrap:last-child:nth-child(odd) {
          grid-column: 1 / -1;
          justify-self: center;
        }
        /* reset 3-col rule that does not apply here */
        .mlh-card-wrap:last-child:nth-child(3n + 1) {
          grid-column: unset;
        }
      }

      /* ── mobile: single column ── */
      @media (max-width: 600px) {
        .mlh-grid {
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        /* reset all centering overrides – everything is full-width already */
        .mlh-card-wrap:last-child {
          grid-column: unset;
          justify-self: center;
        }
      }

      /* ── card shell ── */
      .mlh-card {
        width: 260px;
        height: 200px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        margin: 0 auto;
        border: 1.5px solid rgba(255,215,0,0.35);
        box-shadow: 0 4px 30px rgba(0,0,0,0.4), 0 0 20px rgba(255,215,0,0.12);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        backdrop-filter: blur(20px);
        background: rgba(25, 38, 120, 0.45);
      }
      .mlh-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 35px rgba(255,215,0,0.25);
        border-color: rgba(255,215,0,0.7);
      }

      /* ── white logo area ── */
      .mlh-logo-area {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        position: relative;
        z-index: 2;
        /* subtle inner white glow so logos stay readable */
        background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 75%);
      }

      /* white pill behind the logo image for maximum contrast */
      .mlh-logo-pill {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.92);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 1rem;
        box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        overflow: hidden;
      }

      /* shiny glare sweep – #f17575 with white-hot center */
      .mlh-logo-pill::after {
        content: "";
        position: absolute;
        top: -120%;
        left: -200%;
        width: 55px;
        height: 340%;
        background: linear-gradient(
          to right,
          transparent 0%,
          rgba(241,117,117,0.04) 20%,
          rgba(241,117,117,0.18) 38%,
          rgba(255,200,200,0.70) 48%,
          rgba(255,255,255,0.90) 50%,
          rgba(255,200,200,0.70) 52%,
          rgba(241,117,117,0.18) 62%,
          rgba(241,117,117,0.04) 80%,
          transparent 100%
        );
        transform: rotate(25deg);
        filter: blur(1.5px);
        animation: mlh-shimmer 4.5s infinite ease-in-out;
        pointer-events: none;
      }
      @keyframes mlh-shimmer {
        0%   { left: -150%; }
        45%  { left: 150%; }
        100% { left: 150%; }
      }

      /* border-glow ring on hover via ::before */
      .mlh-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 20px;
        padding: 1.5px;
        background: radial-gradient(var(--glow-r, 200px) circle at var(--glow-x, 50%) var(--glow-y, 50%),
          rgba(255,215,0, calc(var(--glow-i, 0) * 0.9)) 0%,
          rgba(255,215,0, calc(var(--glow-i, 0) * 0.4)) 30%,
          transparent 60%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        pointer-events: none;
        z-index: 3;
      }

      @media (max-width: 600px) {
        .mlh-card { width: 240px; height: 180px; }
        .mlh-logo-area { padding: 1rem; }
      }
    `}</style>

    <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 select-none">
      {/* Section heading */}
      <h2 className="text-xl md:text-3xl font-bold text-center text-[#f17575ff] mb-12 relative font-['PPMori'] tracking-tight pt-4 w-full">
        <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
          MLH League Partners
        </span>
      </h2>

      <div className="mlh-grid pb-8" ref={gridRef}>
        {mlhLeagueData.map((item, index) => {
          const card = (
            <div className="mlh-card">
              <div className="mlh-logo-area">
                <div className="mlh-logo-pill">
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width:600px) 200px, 220px"
                  />
                </div>
              </div>
            </div>
          );

          if (enableStars) {
            return (
              <div key={`mlh-${index}`} className="mlh-card-wrap" style={{ visibility: 'hidden' }}>
                <ParticleCard
                  disableAnimations={disableAnimations}
                  particleCount={particleCount}
                  glowColor={ACCENT_RGB}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {card}
                </ParticleCard>
              </div>
            );
          }
          return (
            <div key={`mlh-${index}`} className="mlh-card-wrap" style={{ visibility: 'hidden' }}>
              {card}
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default MLHLeague;
