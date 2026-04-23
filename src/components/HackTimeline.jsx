'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

const scheduleData = [
  {
    day: "DAY 1: INVITE INNOVATE",
    accent: "#f17575ff",
    items: [
      { time: "11:30 AM", title: "Check-in" },
      { time: "1:00 PM", title: "Inauguration" },
      { time: "4:00 PM", title: "Hacking Begins" },
      { time: "6:00 PM", title: "Snacks" },
      { time: "7:00–9:00 PM", title: "Mentoring Session 1" },
      { time: "8:00–9:00 PM", title: "Dinner" },
      { time: "12:00 AM", title: "Midnight Surprise 1" },
    ]
  },
  {
    day: "DAY 2: BUILD & BEND",
    accent: "#a78bfa",
    items: [
      { time: "8:00 AM", title: "Breakfast" },
      { time: "1:30 PM", title: "Lunch" },
      { time: "5:00 PM", title: "Snacks" },
      { time: "6:00–7:00 PM", title: "MLH Seminar on Gemini & Copilot" },
      { time: "7:00–9:00 PM", title: "Mentoring Session 2" },
      { time: "8:00–9:00 PM", title: "Dinner" },
      { time: "Post Dinner", title: "Tech Together MLH" },
      { time: "12:00 AM", title: "Midnight Surprise 2" },
    ]
  },
  {
    day: "DAY 3: FROM CODE TO GLORY",
    accent: "#fbbf24",
    items: [
      { time: "8:00 AM", title: "Breakfast" },
      { time: "10:00 AM", title: "Submission Deadline" },
      { time: "10:00–12:00 PM", title: "Judging Round 1" },
      { time: "12:00 PM", title: "Lunch" },
      { time: "1:30 PM", title: "Announcement of Top 10 Teams" },
      { time: "2:00 PM", title: "Finalist Demo" },
      { time: "4:00 PM", title: "Announcement of Winners" },
      { time: "4:45 PM", title: "Closing Ceremony" },
      { time: "5:00 PM", title: "Check-out" },
    ]
  }
];

const Timeline2D = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const progressPathRef = useRef(null);
  const mobileProgressRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pathRef.current || !progressPathRef.current || !containerRef.current) return;

    const pathLength = pathRef.current.getTotalLength();
    
    gsap.set(progressPathRef.current, { 
      strokeDasharray: pathLength, 
      strokeDashoffset: pathLength 
    });

    const stList = [];

    // --- Desktop Snake View Animations ---
    const desktopStartVp = 75;
    const desktopEndVp = 85;
    const desktopScrollRange = 80;

    const stDesktopLine = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top ${desktopStartVp}%`,
      end: `top+=${desktopScrollRange}% ${desktopEndVp}%`,
      scrub: 1.5,
      animation: gsap.to(progressPathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
      })
    });
    stList.push(stDesktopLine);

    const desktopNodes = gsap.utils.toArray('.desktop-view .checkpoint-node', containerRef.current);
    const totalDesktop = desktopNodes.length;

    desktopNodes.forEach((node, index) => {
      const progress = index / Math.max(1, totalDesktop - 1);
      const accent = node.dataset.color || '#f17575ff';
      const vpTrigger = desktopStartVp + progress * (desktopEndVp - desktopStartVp);
      
      const nodeAnim = gsap.fromTo(node, 
        { scale: 0.8, opacity: 0.4, backgroundColor: 'transparent', boxShadow: 'none' },
        {
          scale: 1.3,
          opacity: 1,
          backgroundColor: accent,
          boxShadow: `0 0 20px ${accent}`,
          duration: 0.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${progress * desktopScrollRange}% ${vpTrigger}%`,
            toggleActions: "play none none reverse",
          }
        }
      );
      stList.push(nodeAnim.scrollTrigger);
      
      const card = node.closest('.checkpoint-wrapper').querySelector('.event-card');
      if (card) {
        const cardAnim = gsap.fromTo(card,
          { y: card.classList.contains('card-above') ? 15 : -15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${progress * desktopScrollRange}% ${vpTrigger}%`,
              toggleActions: "play none none reverse",
            }
          }
        );
        stList.push(cardAnim.scrollTrigger);
      }
    });

    // --- Mobile Vertical View Animations ---
    if (mobileProgressRef.current) {
      const mobileView = containerRef.current.querySelector('.mobile-view');
      if (mobileView) {
        const stMobileLine = ScrollTrigger.create({
          trigger: mobileView,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 1.5,
          animation: gsap.fromTo(mobileProgressRef.current,
            { scaleY: 0 },
            { scaleY: 1, ease: "none" }
          )
        });
        stList.push(stMobileLine);
      }
    }

    const mobileNodes = gsap.utils.toArray('.mobile-view .checkpoint-node', containerRef.current);
    mobileNodes.forEach((node) => {
      const accent = node.dataset.color || '#f17575ff';
      const nodeAnim = gsap.fromTo(node, 
        { scale: 0.8, opacity: 0.4, backgroundColor: 'transparent', boxShadow: 'none' },
        {
          scale: 1.3,
          opacity: 1,
          backgroundColor: accent,
          boxShadow: `0 0 20px ${accent}`,
          duration: 0.4,
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
      stList.push(nodeAnim.scrollTrigger);
      
      const card = node.closest('.checkpoint-wrapper').querySelector('.event-card');
      if (card) {
        const cardAnim = gsap.fromTo(card,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: node,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );
        stList.push(cardAnim.scrollTrigger);
      }
    });

    return () => {
      stList.forEach(t => t && t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-20 bg-[#010524] text-white overflow-hidden font-['PPMori'] mt-16">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        
        {/* Header removed and moved to parent */}

        {/* Desktop Snake View */}
        <div className="desktop-view hidden md:block relative h-[800px]">
          
          {/* SVG Snake Path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="none"
          >
            <path 
              ref={pathRef}
              d="M 150 100 L 1050 100 C 1250 100 1250 400 1050 400 L 150 400 C -50 400 -50 700 150 700 L 1050 700" 
              fill="none" 
              stroke="rgba(255,255,255,0.08)" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <path 
              ref={progressPathRef}
              d="M 150 100 L 1050 100 C 1250 100 1250 400 1050 400 L 150 400 C -50 400 -50 700 150 700 L 1050 700" 
              fill="none" 
              stroke="url(#snakeGradient)" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 10px #f17575ff)"
            />
            <defs>
              <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f17575ff" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rows of Content */}
          <div className="relative z-10 w-full h-full">
            {scheduleData.map((day, dIdx) => {
              const rowY = 100 + (dIdx * 300);
              const paddingClass = dIdx === 1 ? 'pl-[180px] pr-[320px]' : 'pl-[320px] pr-[180px]';
              return (
                <div key={dIdx} className="absolute w-full" style={{ top: `${rowY}px` }}>
                  
                  {/* Day Header - placed directly on the line */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${dIdx === 1 ? 'right-0' : 'left-0'} px-6 py-3 bg-[#010524] border border-[#f17575ff]/40 rounded-full z-30 shadow-[0_0_15px_rgba(241,117,117,0.15)]`}>
                    <span className="text-sm font-bold tracking-wider font-['PPMori']" style={{ color: day.accent }}>
                      {day.day}
                    </span>
                  </div>

                  {/* Lane items */}
                  <div className={`flex items-center justify-between w-full ${paddingClass} ${dIdx === 1 ? 'flex-row-reverse' : 'flex-row'}`}>
                    {day.items.map((item, iIdx) => {
                      const isAbove = iIdx % 2 !== 0;
                      return (
                        <div key={iIdx} className="checkpoint-wrapper relative flex items-center justify-center">
                          <div 
                            className="checkpoint-node w-4 h-4 rounded-full border-[3px] border-[#010524] bg-white/30 z-20 cursor-pointer transition-all duration-300"
                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
                            data-color={day.accent}
                          />
                          <div className={`
                            event-card absolute ${isAbove ? 'bottom-10' : 'top-10'} w-[180px] p-4 rounded-2xl border border-[#FF0000]/30 bg-[#02093D]/80 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]
                            ${isAbove ? 'card-above' : 'card-below'}
                          `}>
                            <div className="text-xs font-['PPMori'] text-gray-400 mb-1">{item.time}</div>
                            <div className="text-sm font-bold text-white font-['PPMori']">{item.title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical View */}
        <div className="mobile-view md:hidden space-y-20 relative mt-8">
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10 z-0" />
          <div 
            ref={mobileProgressRef}
            className="absolute left-[23.5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#f17575ff] via-[#a78bfa] to-[#fbbf24] z-0 origin-top shadow-[0_0_10px_#f17575ff]"
          />
          {scheduleData.map((day, dIdx) => (
            <div key={dIdx} className="space-y-12 relative">
              <div className="sticky top-20 bg-[#010524]/90 backdrop-blur-lg py-2 z-20 flex items-center gap-4">
                <div className="w-8 h-[1px]" style={{ backgroundColor: day.accent }} />
                <span className="text-sm font-bold tracking-widest font-['PPMori']" style={{ color: day.accent }}>{day.day}</span>
              </div>
              <div className="space-y-8 pl-12">
                {day.items.map((item, iIdx) => (
                  <div key={iIdx} className="checkpoint-wrapper relative">
                    <div 
                      className="absolute -left-[30px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/20 border-2 border-[#010524] checkpoint-node" 
                      data-color={day.accent} 
                    />
                    <div className="p-4 rounded-2xl border border-[#FF0000]/30 bg-[#02093D]/80 event-card">
                      <div className="text-xs font-['PPMori'] text-gray-400 mb-1">{item.time}</div>
                      <div className="text-sm font-bold text-white font-['PPMori']">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#f17575ff]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#a78bfa]/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

const Timeline3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!canvasRef.current || !containerRef.current) return;
    
    let isDisposed = false;
    let renderer, scene, camera, clock;
    const objects = [];
    const animations = [];
    let st;

    const initThree = async () => {
      // Best-effort wait for fonts
      if (document.fonts) await document.fonts.ready;
      if (isDisposed) return;

      const isMobile = window.innerWidth < 768;
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#000005');
      const fogDensity = isMobile ? 0.0035 : 0.005;
      scene.fog = new THREE.FogExp2('#0a0020', fogDensity);

      const fov = isMobile ? 75 : 60;
      camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, isMobile ? 3.8 : 4.0, 0);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

      // Starfield
      const starsGeo = new THREE.BufferGeometry();
      const starsCount = 1000;
      const starsPos = new Float32Array(starsCount * 3);
      for (let i=0; i<starsCount; i++) {
        starsPos[i*3] = (Math.random() - 0.5) * 1000;
        starsPos[i*3+1] = (Math.random() - 0.5) * 500;
        starsPos[i*3+2] = (Math.random() - 0.5) * 1000;
      }
      starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
      const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.0, transparent: true, opacity: 0.5 });
      const stars = new THREE.Points(starsGeo, starsMat);
      scene.add(stars);

      // Create Spline Curve for Road
      const curveStartZ = 50;
      const curveEndZ = -1500;
      const numCurvePoints = 40;
      const curvePoints = [];
      for (let i = 0; i < numCurvePoints; i++) {
        const t = i / (numCurvePoints - 1);
        const z = curveStartZ + t * (curveEndZ - curveStartZ);
        const x = Math.sin(t * Math.PI * 4) * 25; // Winding left and right
        curvePoints.push(new THREE.Vector3(x, 0, z));
      }
      const roadCurve = new THREE.CatmullRomCurve3(curvePoints);

      const getCurveT = (z) => {
          return Math.max(0, Math.min(1, (z - curveStartZ) / (curveEndZ - curveStartZ)));
      };

      // Fiber Optic Light Stream Road
      const fiberGroup = new THREE.Group();
      const numStreaks = 60;
      const streakDataList = [];
      const streakColors = ['#ff2d6b', '#ff4566', '#e040fb', '#cc00ff', '#7c3aed', '#5b21b6', '#3b0fa8', '#1a0080'];
      
      for (let i = 0; i < numStreaks; i++) {
        let normalizedPos = (i / (numStreaks - 1)) * 2 - 1;
        let distribution = Math.sign(normalizedPos) * Math.pow(Math.abs(normalizedPos), 1.5);
        let xOffset = distribution * 6; // Width
        
        let absPos = Math.abs(distribution);
        let colorIdx;
        if (absPos < 0.25) colorIdx = Math.floor(Math.random() * 2);
        else if (absPos < 0.6) colorIdx = 2 + Math.floor(Math.random() * 2);
        else colorIdx = 4 + Math.floor(Math.random() * 4);
        
        const color = new THREE.Color(streakColors[colorIdx]);
        const thickness = 0.02 + Math.random() * 0.06;
        
        const streakPoints = [];
        for (let j = 0; j <= 200; j++) {
            const t = j / 200;
            const pt = roadCurve.getPointAt(t);
            const tangent = roadCurve.getTangentAt(t).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
            pt.add(right.multiplyScalar(xOffset));
            pt.y = 0.02 + Math.random() * 0.05;
            streakPoints.push(pt);
        }
        const streakCurve = new THREE.CatmullRomCurve3(streakPoints);
        const streakGeo = new THREE.TubeGeometry(streakCurve, 200, thickness, 3, false);
        
        const streakMat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4 + Math.random() * 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        
        const streak = new THREE.Mesh(streakGeo, streakMat);
        fiberGroup.add(streak);
        
        streakDataList.push({
          mesh: streak,
          baseOpacity: streakMat.opacity,
          pulseSpeed: 1 + Math.random() * 2,
          offset: Math.random() * Math.PI * 2,
          isFlaring: false,
          flareEndTime: 0
        });
      }
      scene.add(fiberGroup);

      const drawRoundedRect = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      const createGlowTexture = (color) => {
          const c = document.createElement('canvas');
          c.width = 128;
          c.height = 128;
          const ctx = c.getContext('2d');
          const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
          grad.addColorStop(0, color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 128, 128);
          return new THREE.CanvasTexture(c);
      };

      let zCursor = -20;
      const zStep = 40;
      
      scheduleData.forEach((day, dIdx) => {
        // Day Banner
        const gateCanvas = document.createElement('canvas');
        gateCanvas.width = isMobile ? 600 : 1000;
        gateCanvas.height = isMobile ? 120 : 200;
        const gctx = gateCanvas.getContext('2d');
        
        const bgGrad = gctx.createLinearGradient(0, 0, 1000, 0);
        bgGrad.addColorStop(0, '#0d0221');
        bgGrad.addColorStop(0.5, '#1a0540');
        bgGrad.addColorStop(1, '#0d0221');
        gctx.fillStyle = bgGrad;
        
        const drawSciFiRect = (ctx, x, y, w, h, clip) => {
            ctx.beginPath();
            ctx.moveTo(x + clip, y);
            ctx.lineTo(x + w - clip, y);
            ctx.lineTo(x + w, y + clip);
            ctx.lineTo(x + w, y + h - clip);
            ctx.lineTo(x + w - clip, y + h);
            ctx.lineTo(x + clip, y + h);
            ctx.lineTo(x, y + h - clip);
            ctx.lineTo(x, y + clip);
            ctx.closePath();
        };
        
        const bannerW = isMobile ? 580 : 980;
        const bannerH = isMobile ? 100 : 180;
        const bannerX = (gateCanvas.width - bannerW) / 2;
        const bannerY = (gateCanvas.height - bannerH) / 2;
        
        drawSciFiRect(gctx, bannerX, bannerY, bannerW, bannerH, isMobile ? 8 : 12);
        gctx.fill();
        
        gctx.fillStyle = 'rgba(255,255,255,0.03)';
        for(let x=bannerX; x<bannerX+bannerW; x+=10) {
            for(let y=bannerY; y<bannerY+bannerH; y+=10) gctx.fillRect(x, y, 2, 2);
        }
        gctx.fillStyle = 'rgba(0,0,0,0.18)';
        for(let y=bannerY; y<bannerY+bannerH; y+=4) gctx.fillRect(bannerX, y, bannerW, 1);
        
        gctx.strokeStyle = '#ff2d9b';
        gctx.lineWidth = 2;
        drawSciFiRect(gctx, bannerX, bannerY, bannerW, bannerH, isMobile ? 8 : 12);
        gctx.stroke();
        
        gctx.strokeStyle = '#7b2fff';
        gctx.lineWidth = 1;
        drawSciFiRect(gctx, bannerX + 6, bannerY + 6, bannerW - 12, bannerH - 12, isMobile ? 6 : 10);
        gctx.stroke();
        
        const drawBracket = (ctx, x, y, dirX, dirY, size) => {
            ctx.beginPath(); ctx.moveTo(x + dirX*size, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dirY*size); ctx.stroke();
        };
        gctx.strokeStyle = '#ff2d9b';
        gctx.lineWidth = isMobile ? 2 : 3;
        const bSize = isMobile ? 10 : 16;
        drawBracket(gctx, bannerX, bannerY, 1, 1, bSize);
        drawBracket(gctx, bannerX + bannerW, bannerY, -1, 1, bSize);
        drawBracket(gctx, bannerX + bannerW, bannerY + bannerH, -1, -1, bSize);
        drawBracket(gctx, bannerX, bannerY + bannerH, 1, -1, bSize);
        
        gctx.fillStyle = '#ffffff';
        const dayFS = isMobile ? 24 : 42;
        gctx.font = `bold ${dayFS}px "PPMori", sans-serif`;
        gctx.textAlign = 'center';
        gctx.textBaseline = 'middle';
        gctx.shadowColor = '#ff2d9b';
        gctx.shadowBlur = isMobile ? 12 : 20;
        const dayText = day.day.toUpperCase().split('').join(String.fromCharCode(8202));
        gctx.fillText(dayText, gateCanvas.width / 2, gateCanvas.height / 2);
        gctx.shadowBlur = 0;
        
        gctx.fillStyle = '#ff2d9b44';
        gctx.fillRect(200, 60, 600, 1);
        gctx.fillRect(200, 140, 600, 1);
        
        const gateTex = new THREE.CanvasTexture(gateCanvas);
        gateTex.minFilter = THREE.LinearFilter;
        const gateGeoW = isMobile ? 16 : 30;
        const gateGeoH = isMobile ? 3.2 : 6;
        const gateGeo = new THREE.PlaneGeometry(gateGeoW, gateGeoH);
        const gateMat = new THREE.MeshBasicMaterial({ map: gateTex, transparent: true, depthWrite: false, opacity: 0 });
        const gateMesh = new THREE.Mesh(gateGeo, gateMat);
        
        const scanGeo = new THREE.PlaneGeometry(gateGeoW, gateGeoH);
        const scanCanvas = document.createElement('canvas');
        scanCanvas.width = 16; scanCanvas.height = 256;
        const sctx = scanCanvas.getContext('2d');
        const sGrad = sctx.createLinearGradient(0, 0, 0, 256);
        sGrad.addColorStop(0, 'rgba(255,45,155,0)');
        sGrad.addColorStop(0.5, 'rgba(255,45,155,0.08)');
        sGrad.addColorStop(1, 'rgba(255,45,155,0)');
        sctx.fillStyle = sGrad;
        sctx.fillRect(0,0,16,256);
        const scanTex = new THREE.CanvasTexture(scanCanvas);
        scanTex.wrapS = THREE.RepeatWrapping;
        scanTex.wrapT = THREE.RepeatWrapping;
        const scanMat = new THREE.MeshBasicMaterial({ map: scanTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        const scanMesh = new THREE.Mesh(scanGeo, scanMat);
        scanMesh.position.z = 0.01;
        gateMesh.add(scanMesh);
        
        const gT = getCurveT(zCursor);
        const gPt = roadCurve.getPointAt(gT);
        gateMesh.position.copy(gPt);
        gateMesh.position.y = isMobile ? 4.8 : 6;
        gateMesh.scale.x = 0.01;
        scene.add(gateMesh);
        objects.push(gateMesh);
        
        gateMesh.userData = { isBanner: true, zTarget: zCursor, scan: scanMesh };
        
        zCursor -= 30;
        
        const baseBorderShader = {
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec2 vUv;
                
                float sdBox(vec2 p, vec2 b) {
                    vec2 d = abs(p) - b;
                    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
                }
                
                void main() {
                    vec2 p = (vUv - 0.5) * vec2(2.2, 1.0);
                    float d = sdBox(p, vec2(1.05, 0.45));
                    
                    float border = smoothstep(0.025, 0.00, abs(d));
                    
                    float angle = atan(p.y, p.x);
                    float moving = fract(angle / 6.2831853 - time * 0.5);
                    
                    float glow = smoothstep(0.0, 0.5, moving) * smoothstep(1.0, 0.98, moving);
                    float head = smoothstep(0.97, 1.0, moving);
                    
                    float alpha = border * (glow * 0.8 + head * 1.5) * 1.5;
                    
                    gl_FragColor = vec4(color * (1.0 + head * 0.5), alpha);
                }
            `
        };
        
        day.items.forEach((item, iIdx) => {
           const side = iIdx % 2 === 0 ? -1 : 1; 
           
           const createSignTex = (isVisited) => {
               const c = document.createElement('canvas');
               c.width = 440;
               c.height = 200;
               const ctx = c.getContext('2d');
               
               ctx.fillStyle = '#07021a';
               ctx.fillRect(10, 10, 420, 180);
               
               const rGrad = ctx.createRadialGradient(220, 100, 0, 220, 100, 200);
               rGrad.addColorStop(0, 'rgba(120, 40, 255, 0.12)');
               rGrad.addColorStop(1, 'transparent');
               ctx.fillStyle = rGrad;
               ctx.fillRect(10, 10, 420, 180);
               
               ctx.fillStyle = 'rgba(0,0,0,0.15)';
               for(let y=10; y<190; y+=4) ctx.fillRect(10, y, 420, 1);
               
               ctx.strokeStyle = isVisited ? '#ff2d9b' : '#331166';
               ctx.lineWidth = 3;
               drawBracket(ctx, 10, 10, 1, 1, 10);
               drawBracket(ctx, 430, 10, -1, 1, 10);
               drawBracket(ctx, 430, 190, -1, -1, 10);
               drawBracket(ctx, 10, 190, 1, -1, 10);
               
               ctx.fillStyle = isVisited ? '#ff6ec7' : '#552255';
               if (isVisited) {
                   ctx.shadowColor = '#ff6ec7';
                   ctx.shadowBlur = 18;
               }
               ctx.beginPath();
               ctx.arc(410, 30, 5, 0, Math.PI * 2);
               ctx.fill();
               ctx.shadowBlur = 0;
               
               ctx.fillStyle = '#ffffff11';
               ctx.fillRect(10, 70, 420, 1);
               
               ctx.textAlign = 'center';
               ctx.fillStyle = '#aa66ff';
               ctx.font = 'bold 22px monospace';
               ctx.fillText(item.time, 220, 48);
               
               ctx.fillStyle = '#ffffff';
               ctx.font = 'bold 38px "PPMori", sans-serif';
               const words = item.title.split(' ');
               let line = '';
               let lines = [];
               for(let n = 0; n < words.length; n++) {
                   let testLine = line + words[n] + ' ';
                   let metrics = ctx.measureText(testLine);
                   if (metrics.width > 380 && n > 0) {
                       lines.push(line);
                       line = words[n] + ' ';
                   } else {
                       line = testLine;
                   }
               }
               lines.push(line);
               
               let yPos = 135 - ((lines.length - 1) * 20);
               lines.forEach(l => {
                   ctx.fillText(l, 220, yPos);
                   yPos += 42;
               });
               
               ctx.textAlign = 'left';
               ctx.fillStyle = '#ff2d9b';
               ctx.font = '14px monospace';
               ctx.fillText('◇', 400, 160);
               
               return new THREE.CanvasTexture(c);
           };
           
           const texBase = createSignTex(false);
           const texVisited = createSignTex(true);
           
           const geo = new THREE.PlaneGeometry(8.8, 4);
           const signGroup = new THREE.Group();
           
           const matBase = new THREE.MeshBasicMaterial({ map: texBase, transparent: true, opacity: 0.5, depthWrite: false });
           const meshBase = new THREE.Mesh(geo, matBase);
           signGroup.add(meshBase);
           
           const matVisited = new THREE.MeshBasicMaterial({ map: texVisited, transparent: true, opacity: 0, depthWrite: false });
           const meshVisited = new THREE.Mesh(geo, matVisited);
           meshVisited.position.z = 0.01;
           signGroup.add(meshVisited);
           
           const borderShaderMat = new THREE.ShaderMaterial({
               uniforms: {
                   time: { value: Math.random() * 10 },
                   color: { value: new THREE.Color('#331166') }
               },
               vertexShader: baseBorderShader.vertexShader,
               fragmentShader: baseBorderShader.fragmentShader,
               transparent: true,
               blending: THREE.AdditiveBlending,
               depthWrite: false
           });
           const borderMesh = new THREE.Mesh(geo, borderShaderMat);
           borderMesh.position.z = 0.02;
           signGroup.add(borderMesh);
           
           const tPos = getCurveT(zCursor);
           const pt = roadCurve.getPointAt(tPos);
           const tangent = roadCurve.getTangentAt(tPos).normalize();
           const up = new THREE.Vector3(0, 1, 0);
           const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
           
           const signPos = isMobile ? pt.clone() : pt.clone().add(right.clone().multiplyScalar(side * 14));
           signPos.y = isMobile ? 4.2 : 3.5;
           signGroup.position.copy(signPos);
           
           const polePos = isMobile ? pt.clone() : pt.clone().add(right.clone().multiplyScalar(side * 14));
            
            let poleMat = null;
            if (!isMobile) {
                const poleGeo = new THREE.CylinderGeometry(0.012, 0.012, signPos.y);
                poleMat = new THREE.MeshBasicMaterial({ color: 0x6622cc });
                const pole = new THREE.Mesh(poleGeo, poleMat);
                polePos.y = signPos.y / 2;
                pole.position.copy(polePos);
                scene.add(pole);
            }
           
           const groundGeo = new THREE.PlaneGeometry(3, 3);
           const groundMat = new THREE.MeshBasicMaterial({
               map: createGlowTexture('#6622cc'),
               transparent: true,
               opacity: 0.4,
               blending: THREE.AdditiveBlending,
               depthWrite: false
           });
           const groundMesh = new THREE.Mesh(groundGeo, groundMat);
           groundMesh.rotation.x = -Math.PI / 2;
           groundMesh.position.copy(isMobile ? pt : polePos);
           groundMesh.position.y = 0.05;
           scene.add(groundMesh);
           
           const ringGeo = new THREE.RingGeometry(0.1, 0.2, 32);
           const ringMat = new THREE.MeshBasicMaterial({ color: 0xff2d9b, transparent: true, opacity: 0, side: THREE.DoubleSide });
           const ring = new THREE.Mesh(ringGeo, ringMat);
           ring.rotation.x = -Math.PI / 2;
           ring.position.copy(isMobile ? pt : polePos);
           ring.position.y = 0.06;
           scene.add(ring);
           
           signGroup.userData = { isSign: true, zTarget: zCursor, visitedMesh: meshVisited, baseMesh: meshBase, borderMat: borderShaderMat, poleMat: poleMat, ring: ring, visited: false, visitTime: 0 };
           scene.add(signGroup);
           objects.push(signGroup);
           
           zCursor -= zStep;
         });
         zCursor -= 20; 
      });
      
      const finishZ = zCursor;
      
      // Finish text
      const fCanvas = document.createElement('canvas');
      fCanvas.width = 1024;
      fCanvas.height = 512;
      const fctx = fCanvas.getContext('2d');
      fctx.fillStyle = '#ffffff';
      fctx.font = 'bold 40px "PPMori", sans-serif';
      fctx.textAlign = 'center';
      fctx.fillText("You've survived the grind, shipped the dream,", 512, 200);
      fctx.fillText("and earned your glory.", 512, 260);
      fctx.fillStyle = '#f17575ff';
      fctx.shadowColor = '#f17575ff';
      fctx.shadowBlur = 20;
      fctx.fillText("The road ends here — but your journey doesn't. 🚀", 512, 340);
      
      const fTex = new THREE.CanvasTexture(fCanvas);
      fTex.minFilter = THREE.LinearFilter;
      const fGeo = new THREE.PlaneGeometry(24, 12);
      const fMat = new THREE.MeshBasicMaterial({ map: fTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const fMesh = new THREE.Mesh(fGeo, fMat);
      
      const fT = getCurveT(finishZ - 20);
      const fPt = roadCurve.getPointAt(fT);
      fMesh.position.copy(fPt);
      fMesh.position.y = 6;
      fMesh.userData = { isFinale: true, zTarget: finishZ - 20 };
      scene.add(fMesh);
      objects.push(fMesh);
      
      // Checkered Line
      const checkCanvas = document.createElement('canvas');
      checkCanvas.width = 256;
      checkCanvas.height = 256;
      const cctx = checkCanvas.getContext('2d');
      cctx.fillStyle = '#ffffff';
      cctx.fillRect(0,0,128,128);
      cctx.fillRect(128,128,128,128);
      cctx.fillStyle = '#000000';
      cctx.fillRect(128,0,128,128);
      cctx.fillRect(0,128,128,128);
      
      const checkTex = new THREE.CanvasTexture(checkCanvas);
      checkTex.wrapS = THREE.RepeatWrapping;
      checkTex.wrapT = THREE.RepeatWrapping;
      checkTex.repeat.set(8, 2);
      const checkGeo = new THREE.PlaneGeometry(16, 4);
      const checkMat = new THREE.MeshBasicMaterial({ map: checkTex });
      const checkMesh = new THREE.Mesh(checkGeo, checkMat);
      
      const checkT = getCurveT(finishZ);
      const checkPt = roadCurve.getPointAt(checkT);
      const checkTangent = roadCurve.getTangentAt(checkT);
      checkMesh.position.copy(checkPt);
      checkMesh.position.y = 0.03;
      checkMesh.rotation.x = -Math.PI / 2;
      checkMesh.rotation.z = Math.atan2(checkTangent.x, checkTangent.z);
      scene.add(checkMesh);

      let targetZ = 0;
      let currentZ = 0;
      
      st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
              targetZ = self.progress * (finishZ - 40);
          }
      });
      
      clock = new THREE.Clock();
      
      let lastScrollProgress = 0;

      const animate = () => {
          if (isDisposed) return;
          const dt = clock.getDelta();
          const el = clock.getElapsedTime();
          
          currentZ += (targetZ - currentZ) * 5 * dt;
          
          const tCam = getCurveT(currentZ);
          const camPt = roadCurve.getPointAt(tCam);
          const camTangent = roadCurve.getTangentAt(tCam).normalize();
          
          camera.position.x = camPt.x;
          camera.position.y = 4;
          camera.position.z = camPt.z;
          
          const lookAtPt = camPt.clone().add(camTangent.multiplyScalar(10));
          lookAtPt.y = 4;
          camera.lookAt(lookAtPt);
          
          camera.rotation.x += Math.sin(el * 0.3) * 0.015;
          
          const scrollDelta = Math.abs(currentZ - lastScrollProgress);
          lastScrollProgress = currentZ;
          const pulseFactor = 1 + scrollDelta * 10;
          
          streakDataList.forEach((streakData) => {
              let opacity = streakData.baseOpacity;
              opacity += Math.sin(el * streakData.pulseSpeed * pulseFactor + streakData.offset) * 0.3;
              
              if (streakData.isFlaring) {
                  if (el > streakData.flareEndTime) {
                      streakData.isFlaring = false;
                  } else {
                      opacity += 0.5;
                  }
              } else {
                  if (Math.random() < 0.002 * pulseFactor) {
                      streakData.isFlaring = true;
                      streakData.flareEndTime = el + 0.2 + Math.random() * 0.2;
                  }
              }
              streakData.mesh.material.opacity = Math.max(0.1, Math.min(1.0, opacity));
          });
          
          objects.forEach(obj => {
             if (obj.userData && obj.userData.isBanner) {
                 obj.lookAt(camera.position);
                 
                 const zDiff = currentZ - obj.userData.zTarget; 
                 if (zDiff > -50 && zDiff < 150) { 
                     obj.scale.x = THREE.MathUtils.lerp(obj.scale.x, 1.0, 0.05);
                     obj.material.opacity = THREE.MathUtils.lerp(obj.material.opacity, 1, 0.05);
                     obj.userData.scan.material.map.offset.y -= dt * 1.5;
                 } else { 
                     obj.scale.x = THREE.MathUtils.lerp(obj.scale.x, 0.01, 0.05);
                     obj.material.opacity = THREE.MathUtils.lerp(obj.material.opacity, 0, 0.05);
                 }
                 obj.position.y = (isMobile ? 4.8 : 6) + Math.sin(el * 0.6) * 0.04;
                 
             } else if (obj.userData && obj.userData.isSign) {
                 obj.lookAt(camera.position);
                 const dist = camera.position.distanceTo(obj.position);
                 const isReached = currentZ < obj.userData.zTarget + 60;
                 
                 obj.userData.borderMat.uniforms.time.value += dt;
                 
                 if (isReached) {
                     if (!obj.userData.visited) obj.userData.visited = true;
                     obj.userData.visitedMesh.material.opacity = THREE.MathUtils.lerp(obj.userData.visitedMesh.material.opacity, 1, 0.1);
                     obj.userData.baseMesh.material.opacity = THREE.MathUtils.lerp(obj.userData.baseMesh.material.opacity, 0, 0.1);
                     if (obj.userData.poleMat) obj.userData.poleMat.color.lerp(new THREE.Color('#ff2d9b'), 0.1);
                     obj.userData.borderMat.uniforms.color.value.lerp(new THREE.Color('#ff2d9b'), 0.1);
                 } else {
                     obj.userData.visitedMesh.material.opacity = THREE.MathUtils.lerp(obj.userData.visitedMesh.material.opacity, 0, 0.1);
                     obj.userData.baseMesh.material.opacity = THREE.MathUtils.lerp(obj.userData.baseMesh.material.opacity, 0.5, 0.1);
                     if (obj.userData.poleMat) obj.userData.poleMat.color.lerp(new THREE.Color('#6622cc'), 0.1);
                     obj.userData.borderMat.uniforms.color.value.lerp(new THREE.Color('#331166'), 0.1);
                 }
                 
                 if (obj.userData.visited) {
                     obj.userData.visitTime += dt;
                     if (obj.userData.visitTime < 0.8) {
                         const vT = obj.userData.visitTime;
                         obj.userData.ring.scale.setScalar(1 + vT * 1.5);
                         obj.userData.ring.material.opacity = 0.6 * (1 - vT / 0.8);
                     } else {
                         obj.userData.ring.material.opacity = 0;
                     }
                 }
                 
                 obj.visible = obj.position.z < camera.position.z + 10;
             } else {
                 obj.lookAt(camera.position);
                 obj.visible = obj.position.z < camera.position.z + 10;
             }
          });
          
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
      };
      
      animate();
      
      const handleResize = () => {
         if (!camera || !renderer) return;
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
    };

    initThree();

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', () => {});
      if (renderer) renderer.dispose();
      if (st) st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[800vh] bg-[#010524] mt-16">
      
      {/* 3D Header Text moved to parent */}

      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#010524] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#010524] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default function HackTimeline() {
  const [mode, setMode] = useState('2D');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setIsLowEnd(true);
      setMode('2D');
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="timeline" className="relative w-full bg-[#010524] pt-24">
      
      {/* Universal Header */}
      <div className="relative z-[55] text-center mb-16 px-6">
        <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center mb-12 font-['PPMori'] tracking-tight">
          <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
            Timeline
          </span>
        </h2>
        
        {/* 2D/3D Switcher */}
        {!isLowEnd && (
          <div className="inline-flex items-center bg-[#02093D]/80 backdrop-blur-md border border-[#f17575ff]/30 rounded-full p-1 shadow-[0_0_20px_rgba(241,117,117,0.2)]">
            <button 
              onClick={() => setMode('2D')} 
              className={`px-8 py-2 rounded-full transition-all duration-300 text-sm font-bold ${mode === '2D' ? 'bg-[#f17575ff] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              2D
            </button>
            <button 
              onClick={() => setMode('3D')} 
              className={`px-8 py-2 rounded-full transition-all duration-300 text-sm font-bold ${mode === '3D' ? 'bg-[#f17575ff] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              3D
            </button>
          </div>
        )}
      </div>

      {mode === '2D' ? <Timeline2D /> : <Timeline3D key={isMobile ? 'mobile' : 'desktop'} />}
      
    </section>
  );
}
