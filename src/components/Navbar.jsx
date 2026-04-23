'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Home',     href: '/'         },
  { name: 'About',    href: '#about'    },
  { name: 'Tracks',   href: '#tracks'   },
  { name: 'Prizes',   href: '#prizes'   },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Teams',    href: '#teams'    },
  { name: 'FAQs',     href: '#faqs'     },
  { name: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const [isOpen,        setIsOpen       ] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const [scrolled,      setScrolled     ] = useState(false);
  const [activePill,    setActivePill   ] = useState({ left: 0, width: 0 });
  const navRef   = useRef(null);
  const menuRef  = useRef(null);
  const linksRef = useRef([]);

  /* ─── Smooth scroll helper ────────────────────────────────────
   * For hash links, prevent default jump and use scrollIntoView.
   * For '/' (Home) scroll to top.                               */
  const smoothNav = useCallback((e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id  = href.replace('#', '');
    const el  = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  /* ─── Scroll spy ──────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 100) { setActiveSection('/'); return; }
      document.querySelectorAll('section[id]').forEach(sec => {
        if (
          window.scrollY >= sec.offsetTop - 160 &&
          window.scrollY <  sec.offsetTop + sec.offsetHeight - 160
        ) setActiveSection(`#${sec.getAttribute('id')}`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Active-pill position (desktop) ─────────────────────── */
  useEffect(() => {
    const idx = navItems.findIndex(i => i.href === activeSection);
    const el  = linksRef.current[idx];
    if (!el || !navRef.current) return;
    const nr = navRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setActivePill({ left: er.left - nr.left, width: er.width });
  }, [activeSection]);

  /* ─── Close on outside click / touch ─────────────────────── */
  useEffect(() => {
    const close = (e) => {
      if (
        isOpen &&
        !navRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) setIsOpen(false);
    };
    document.addEventListener('mousedown',  close);
    document.addEventListener('touchstart', close, { passive: true });
    return () => {
      document.removeEventListener('mousedown',  close);
      document.removeEventListener('touchstart', close);
    };
  }, [isOpen]);

  /* ─── Lock body scroll while menu is open ────────────────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ─── Keyframes ────────────────────────────────────────── */}
      <style>{`
        @keyframes nb-fadein {
          from { opacity:0; transform:translateY(-7px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes nb-slidedown {
          from { opacity:0; transform:translateY(-14px) scale(.96) }
          to   { opacity:1; transform:translateY(0)    scale(1) }
        }
        @keyframes nb-logopulse {
          0%,100% { box-shadow:0 0 0 0 rgba(255,0,0,0) }
          50%     { box-shadow:0 0 18px 5px rgba(255,0,0,0.28) }
        }
        .nb-navitem  { animation: nb-fadein    .4s both; }
        .nb-dropdown { animation: nb-slidedown .22s cubic-bezier(.4,0,.2,1) both; }
        .nb-logo     { animation: nb-logopulse 3s ease-in-out infinite; border-radius:9999px; }
      `}</style>

      {/* ─── Outer sticky wrapper ─────────────────────────────── */}
      <div className="sticky top-3 z-50 flex flex-col items-center px-3 md:px-4 gap-3 pointer-events-none">

        {/* ══ PILL BAR ════════════════════════════════════════ */}
        <div
          ref={navRef}
          className={`
            pointer-events-auto
            w-full md:w-auto relative rounded-full border
            transition-all duration-500 ease-in-out
            ${scrolled
              ? 'bg-[#02093d]/88 backdrop-blur-2xl border-[#ff0000]/60 shadow-[0_8px_40px_rgba(255,0,0,0.18)]'
              : 'bg-[#02093d]/65 backdrop-blur-lg  border-[#ff0000]/30 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'}
          `}
        >
          <div className="flex items-center px-3 py-2 gap-2 md:gap-1">

            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 nb-logo"
              onClick={(e) => smoothNav(e, '/')}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/nmithacks2024/nh26@main/public/assets/navbar%20logo.png"
                alt="NMIT Hacks"
                className="h-8 w-auto object-contain"
                draggable="false"
              />
            </a>

            {/* Mobile centre title */}
            <span className="md:hidden flex-1 text-center text-white text-[11px] font-black tracking-[0.2em] font-['PPMori'] uppercase select-none pointer-events-none">
              NMIT HACKS 2026
            </span>

            {/* Desktop sliding pill indicator */}
            <span
              aria-hidden
              className="hidden md:block absolute top-1/2 -translate-y-1/2 h-[calc(100%-14px)] rounded-full bg-[#ff0000]/12 border border-[#ff0000]/25 transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] pointer-events-none"
              style={{ left: activePill.left, width: activePill.width }}
            />

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5 ml-2">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.name} className="nb-navitem" style={{ animationDelay: `${idx * 38}ms` }}>
                    <a
                      ref={el => { linksRef.current[idx] = el; }}
                      href={item.href}
                      onClick={(e) => smoothNav(e, item.href)}
                      className={`
                        relative px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                        font-['PPMori'] whitespace-nowrap transition-colors duration-200 cursor-pointer
                        ${isActive ? 'text-[#ff0000]' : 'text-gray-300 hover:text-white'}
                      `}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile toggle button */}
            <button
              onClick={() => setIsOpen(o => !o)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className={`
                md:hidden flex-shrink-0 flex items-center justify-center
                w-9 h-9 rounded-full border transition-all duration-300
                ${isOpen
                  ? 'bg-[#ff0000]/20 border-[#ff0000]/60 text-[#ff0000]'
                  : 'bg-white/5 border-white/15 text-white hover:bg-white/10'}
              `}
            >
              {isOpen ? (
                /* ── Bold X icon ──────────────────────────────── */
                <svg
                  width="18" height="18" viewBox="0 0 18 18"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.8" strokeLinecap="round"
                >
                  <line x1="3" y1="3" x2="15" y2="15" />
                  <line x1="15" y1="3" x2="3" y2="15" />
                </svg>
              ) : (
                /* ── Three-line hamburger ─────────────────────── */
                <svg
                  width="18" height="18" viewBox="0 0 18 18"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round"
                >
                  <line x1="2" y1="5"  x2="16" y2="5"  />
                  <line x1="2" y1="9"  x2="16" y2="9"  />
                  <line x1="2" y1="13" x2="16" y2="13" />
                </svg>
              )}
            </button>

          </div>
        </div>{/* /pill */}

        {/* ══ MOBILE DROPDOWN ══════════════════════════════════ */}
        {isOpen && (
          <div
            ref={menuRef}
            className="pointer-events-auto nb-dropdown md:hidden
              w-full max-w-[min(390px,calc(100vw-24px))]
              rounded-2xl border border-[#ff0000]/35
              bg-[#02093d]/95 backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.65)]
              overflow-hidden"
          >
            {/* top red accent line */}
            <div className="h-px mx-5 bg-gradient-to-r from-transparent via-[#ff0000]/55 to-transparent" />

            <div className="p-2.5 flex flex-col gap-1">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => smoothNav(e, item.href)}
                    className={`
                      flex items-center gap-3.5 px-4 py-3.5 rounded-xl
                      text-[13px] font-bold uppercase tracking-widest font-['PPMori']
                      transition-all duration-200 active:scale-[.98] cursor-pointer
                      ${isActive
                        ? 'bg-[#ff0000]/15 text-[#ff0000] border border-[#ff0000]/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'}
                    `}
                    style={{ animationDelay: `${idx * 38}ms` }}
                  >
                    {/* indicator dot */}
                    <span
                      className={`
                        w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300
                        ${isActive
                          ? 'bg-[#ff0000] shadow-[0_0_8px_#ff0000] scale-125'
                          : 'bg-white/20'}
                      `}
                    />
                    <span className="flex-1">{item.name}</span>
                    {/* chevron only for inactive */}
                    {!isActive && (
                      <svg
                        className="opacity-25" width="14" height="14"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Bottom strip — branding only, no external link */}
            <div className="border-t border-white/5 px-6 py-3 flex justify-center">
              <span className="text-[9px] text-gray-500 tracking-[0.25em] uppercase font-['PPMori']">
                NMIT Hacks 2026
              </span>
            </div>
          </div>
        )}

      </div>
    </>
  );
}