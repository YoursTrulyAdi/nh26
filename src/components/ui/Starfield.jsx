"use client";
import React, { useRef, useEffect } from "react";

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = null;
    let stars = [];
    let shootingStars = [];
    let isVisible = false;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Reduced star density heavily for buttery smooth scrolling across multiple components
      const numStars = Math.floor((canvas.width * canvas.height) / 4000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2, 
          opacity: Math.random(),
          speedPulse: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.9 ? '#f17575' : '#ffffff' 
        });
      }
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 1.5,
        y: 0,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 10 + 5,
        opacity: 1,
        thickness: Math.random() * 1.5 + 0.5,
        angle: Math.PI / 4, 
      });
    };

    const draw = () => {
      if (!isVisible) return; // Prevent drawing if not visible

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.opacity += star.speedPulse;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.speedPulse = -star.speedPulse;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.closePath();
      });

      // Reset global alpha
      ctx.globalAlpha = 1;

      // Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let ss = shootingStars[i];
        ss.x -= ss.speed * Math.cos(ss.angle);
        ss.y += ss.speed * Math.sin(ss.angle);
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x < 0 || ss.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        const gradient = ctx.createLinearGradient(
          ss.x, ss.y, 
          ss.x + ss.length * Math.cos(ss.angle), 
          ss.y - ss.length * Math.sin(ss.angle)
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x + ss.length * Math.cos(ss.angle),
          ss.y - ss.length * Math.sin(ss.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.thickness;
        ctx.stroke();
        ctx.closePath();
      }

      if (Math.random() < 0.03) {
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // If it became visible and we aren't already animating, start animating
          if (!animationFrameId) {
            draw();
          }
        } else {
          // If it went off screen, stop animating
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0 }); // Trigger on any visibility

    observer.observe(canvas);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Starfield;
