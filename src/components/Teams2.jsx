"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Starfield from './ui/Starfield';

// Social Icons
const Icons = {
  LinkedIn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

const TEAMS_DATA = [
  { 
    name: 'Operations Team', 
    members: [
      {
        name: 'Pavan Teja',
        role: 'Operations Co-Lead',
        image: '/assets/TeamPics/Pavan.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/itspavant',
          instagram: 'https://www.instagram.com/pavanteja443'
        }
      },
      {
        name: 'Roma Narayan',
        role: 'Operations Co-Lead',
        image: '/assets/TeamPics/Roma.png',
        imageClassName: 'scale-[1.5] object-[center_-60%] ',
        socials: {
          linkedin: 'https://www.linkedin.com/in/roma-n12',
          instagram: 'https://www.instagram.com/_roma.12_/',
          twitter: 'https://x.com/Romalisha12'
        }
      },
      {
        name: 'Bhavy Shukla',
        role: 'Operations Core',
        image: '/assets/TeamPics/Bhavy.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {}
      },
      {
        name: 'Rishabh Jeppu',
        role: 'Operations Mentor',
        image: '/assets/TeamPics/Rishabh.png',
        imageClassName: 'scale-[1.4] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/rishabh-jeppu/'
        }
      },
      {
        name: 'Kavya Y P',
        role: 'Operations Mentor',
        image: '/assets/TeamPics/Kavya.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/kavya-yp/',
          twitter: 'https://x.com/YpKavya?t=Yhk3eQpXt5zUn5hkPYLYzQ&s=09',
          instagram: 'https://www.instagram.com/kavya___parmesh'
        }
      }
    ]
  },
  { 
    name: 'Sponsorship Team', 
    members: [
      {
        name: 'Arindam Kalita',
        role: 'Sponsorship Mentor',
        image: '/assets/TeamPics/Arindam.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/arindam-kalita-4a6514250/'
        }
      },
      {
        name: 'Neelanshu Ranjan',
        role: 'Sponsorship Lead',
        image: '/assets/TeamPics/Neelanshu.png',
        imageClassName: 'scale-[1.5] object-[center_-70%]',
        socials: {}
      },
      {
        name: 'Adarsh U A',
        role: 'Sponsorship Mentor',
        image: '/assets/TeamPics/Adarsh.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/adarsh-u-a-6493222a1/',
          instagram: 'https://www.instagram.com/16_adrsshh'
        }
      }
    ]
  },
  { 
    name: 'Design Team', 
    members: [
      {
        name: 'Kopal V',
        role: 'Design Co-Lead',
        image: '/assets/TeamPics/Kopal.png',
        imageClassName: 'scale-[1.5] object-[center_-65%]',
        socials: {
          instagram: 'https://www.instagram.com/kopalllllllll?igsh=MWM0MWh0NjJhd2dzNg==',
          linkedin: 'https://www.linkedin.com/in/kopal-vajpayee-962b55287/',
          twitter: 'https://share.google/n0SF78YQo1T4oKjsz'
        }
      },
      {
        name: 'Rashmika R',
        role: 'Design Co-Lead',
        image: '/assets/TeamPics/Rashmika.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          instagram: 'https://www.instagram.com/rashmika__157',
          linkedin:'https://www.linkedin.com/in/rashmika-ramesh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
        }
      },
      {
        name: 'Kusheen Dhar',
        role: 'Design Core',
        image: '/assets/TeamPics/Kusheen.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {}
      },
      {
        name: 'Priya A Reddy',
        role: 'Design Mentor',
        image: '/assets/TeamPics/Priya.png',
        imageClassName: 'scale-[1.2] object-[center_-25%]',
        socials: {
          instagram: 'https://www.instagram.com/p_reddy04',
        }
      },
      {
        name: 'Ayusha Mahi',
        role: 'Design Mentor',
        image: '/assets/TeamPics/Ayusha.png',
        imageClassName: 'scale-[1.21] object-[center_-35%]',
        socials: {
          instagram: 'https://www.instagram.com/ayusha_mahi',
          twitter: 'https://x.com/AyushaMahi?t=vwiabaKfMulksPL5Nt4mww&s=09',
          linkedin:'https://www.linkedin.com/in/ayusha-mahi/'
        }
      }
    ]
  },
  { 
    name: 'Social Media Team', 
    members: [
      {
        name: 'Shreyansh Singh',
        role: 'Social Media Core',
        image: '/assets/TeamPics/Shreyansh.png',
        imageClassName: 'scale-[1.4] object-[center_-60%]',
        socials: {
          instagram: 'https://www.instagram.com/shreyansh_0505/',
          linkedin: 'https://www.linkedin.com/in/shreyansh-singh-424b0833a/',
        }
      },
      {
        name: 'Kolli Sathvi',
        role: 'Social Media Lead',
        image: '/assets/TeamPics/Sathvi (4).png',
        imageClassName: 'scale-[1.6] object-[center_-30%]',
        socials: {}
      },
      {
        name: 'Anshika',
        role: 'Social Media Core',
        image: '/assets/TeamPics/Anshika.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {}
      },
      {
        name: 'Apeksha T S',
        role: 'Social Media Mentor',
        image: '/assets/TeamPics/Apeksha.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/apekshats',
          instagram:'https://www.instagram.com/apeksha_saravu'
        }
      },
      {
        name: 'Prajwal H',
        role: 'Social Media Mentor',
        image: '/assets/TeamPics/Prajwal2.png',
        imageClassName: 'scale-[0.99 object-[center_-2%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/prajwalhundekar-519813262/',
          twitter: 'https://x.com/IMMORTALsays_?t=_RUE_jE7u_QnEazP5RKG2w&s=09',
          instagram:'https://www.instagram.com/___.immortal_'
        }
      }
    ]
  },
  { 
    name: 'Content Team', 
    members: [
      {
        name: 'Inaya Firdous',
        role: 'Content Lead',
        image: '/assets/TeamPics/Inaya.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          instagram: 'https://www.instagram.com/inayafir',
          linkedin:'https://www.linkedin.com/in/inayafirdous?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
        }
      },
      {
        name: 'Kanishka Khaitan',
        role: 'Content Core',
        image: '/assets/TeamPics/Kanishka (1).png',
        imageClassName: 'scale-[1.5] object-[center_-30%]',
        socials: {
          instagram: 'https://www.instagram.com/__kanishka__khaitan?igsh=Y25tMzF0ZjdqM21r&utm_source=qr',
          linkedin:'https://www.linkedin.com/in/kanishka-khaitan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
        }
      },
      {
        name: 'Srujana R Bharadwaj',
        role: 'Content Mentor',
        image: '/assets/TeamPics/Srujana.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/srujana-r-bharadwaj-6999152ab/',
          twitter: 'https://x.com/srb170188',
          instagram: 'https://www.instagram.com/dark.angel_8842/'
        }
      }
    ]
  },
  { 
    name: 'DevFolio Team', 
    members: [
      {
        name: 'Prakhyath Kudva',
        role: 'DevFolio Co-Lead',
        image: '/assets/TeamPics/Prakhyath.png',
        imageClassName: 'scale-[1.15] object-[center_-30%]',
        socials: {
          instagram: 'https://www.instagram.com/prakhyath.kudva',
          twitter:'https://x.com/KudvaPrakhyath',
          linkedin:'https://www.linkedin.com/in/prakhyath-kudva-bb009b274/'
        }
      },
      {
        name: 'Anu',
        role: 'DevFolio Co-Lead',
        image: '/assets/TeamPics/Anu (1).png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {}
      },
      {
        name: 'Dhanusha Reddy',
        role: 'DevFolio Mentor',
        image: '/assets/TeamPics/Dhanusha.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/dhanusha-modiyam/',
          instagram:'https://www.instagram.com/dhanushha_/profilecard/'
        }
      }
    ]
  },
  { 
    name: 'Tech Team', 
    members: [
      {
        name: 'Abhay Surya',
        role: 'Tech Co-Lead',
        image: '/assets/TeamPics/Abhay.png',
        imageClassName: 'scale-[1.35] object-[center_-55%]',
        socials: {}
      },
      {
        name: 'Gurucharan M',
        role: 'Tech Co-Lead',
        image: '/assets/TeamPics/Gurucharan.png',
        imageClassName: 'scale-[1.6] object-[center_-60%]',
        socials: {
          instagram: 'https://www.instagram.com/guru.ch05/',
          linkedin: 'www.linkedin.com/in/gurucharan-maripala-a04b2a319',
          twitter:'https://x.com/GurucharanM05'
        }
      },
      {
        name: 'Alex Catchick',
        role: 'Tech Mentor',
        image: '/assets/TeamPics/Alex.png',
        imageClassName: 'scale-[1.5] object-[center_-60%]',
        socials: {
          linkedin: 'https://www.linkedin.com/in/alex-catchick/',
          twitter: 'https://x.com/AC070323?t=eL_rDOtoQRFxiXmfi9eigA&s=09',
          instagram:'https://www.instagram.com/exabond'
        }
      },
      {
        name: 'Yashas C Raju',
        role: 'Tech Mentor',
        image: '/assets/TeamPics/Yashas.png', 
        imageClassName: 'scale-[1.4] object-[center_50%]',
        socials: {}
      }
    ]
  },
];

const FlipMemberCard = ({ member, onHoverStart, onHoverEnd }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  
  // Dummy data fallback
  const data = member || {
    name: 'Team Member',
    role: 'Member',
    image: '/assets/dummy.png',
    socials: {}
  };

  const socialLinks = data.socials || {};

  // Keep ref in sync with state
  const isFlippedRef = useRef(isFlipped);
  useEffect(() => {
    isFlippedRef.current = isFlipped;
  }, [isFlipped]);

  // Handle "click outside" to close card on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) { 
        if (cardRef.current && !cardRef.current.contains(event.target)) {
          if (isFlippedRef.current) {
            setIsFlipped(false);
            onHoverEnd?.(); 
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onHoverEnd]);

  // Desktop: Hover to flip
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsFlipped(true);
      onHoverStart?.();
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsFlipped(false);
      onHoverEnd?.();
    }
  };

  // Mobile: Click to flip
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const nextState = !isFlipped;
      setIsFlipped(nextState);
      if (nextState) onHoverStart?.(); 
      else onHoverEnd?.(); 
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-[260px] h-[260px] md:w-[300px] md:h-[320px] perspective-1000 shrink-0 cursor-pointer md:cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[35px] bg-[#02093D] border-2 border-[#ff0000] flex flex-col items-center justify-start pt-10 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-6 rounded-full overflow-hidden border-2 border-[#ff0000] shadow-sm">
            <Image 
                src={data.image} 
                alt={data.name} 
                fill
                className={`object-cover ${data.imageClassName || ''}`}
            />
          </div>
          <div className="font-bold text-lg md:text-xl text-white text-center px-4 font-['PPMori']">{data.name}</div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[35px] bg-[#02093D] border-2 border-[#ff0000] flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-lg md:text-xl text-white font-bold flex flex-col items-center mb-8 font-['PPMori']">
            {data.role}
            <div className="h-[2px] w-[50px] bg-white mt-2"></div>
          </div>

          <div className="flex gap-4">
             {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-[#ff0000] hover:scale-110 transform">
                  <Icons.Instagram />
                </a>
             )}
             {socialLinks.twitter && (
                 <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-[#ff0000] hover:scale-110 transform">
                   <Icons.Twitter />
                 </a>
             )}
             {socialLinks.linkedin && (
                 <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-[#ff0000] hover:scale-110 transform">
                   <Icons.LinkedIn />
                 </a>
             )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Teams2 = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerHeight, setContainerHeight] = useState('auto');
  const isTouch = useRef(false);
  const teamRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
      }, 3000); // 3 seconds delay
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const updateMaxHeight = () => {
      const refs = teamRefs.current;
      if (!refs.length) return;
      
      let maxH = 0;
      refs.forEach((ref) => {
        if (ref) {
          maxH = Math.max(maxH, ref.offsetHeight);
        }
      });
      
      if (maxH > 0) {
        setContainerHeight(`${maxH}px`);
      }
    };

    const timeoutId = setTimeout(updateMaxHeight, 100);

    window.addEventListener('resize', updateMaxHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const handleNext = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + TEAMS_DATA.length) % TEAMS_DATA.length);
  };

  return (
    <section className="w-full relative z-10 flex flex-col items-center justify-center bg-[#010524ff] py-20 min-h-screen overflow-hidden">
      <Starfield />
      <div className="absolute inset-0 bg-gradient-to-b from-[#010524ff] via-transparent to-[#010524ff] z-0 pointer-events-none opacity-80"></div>
      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10 w-full mb-16 pt-4">
        <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center font-['PPMori'] tracking-tight">
            <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-3] after:left-0 after:w-0 after:h-[2px] after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                Teams
            </span>
        </h2>
      </div>

      {/* Navigation & Header */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 z-30 relative w-full px-4">
        <button 
          onClick={handlePrev}
          className="p-2 md:p-3 rounded-full border-[2px] border-[#ff0000] text-white hover:bg-white hover:text-[#ff0000] transition-all duration-300 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div className="text-xl md:text-3xl text-white font-['PPMori'] text-center min-w-[200px]">
          {TEAMS_DATA[currentTeamIndex].name}
        </div>

        <button 
          onClick={handleNext}
          className="p-2 md:p-3 rounded-full border-[2px] border-[#ff0000] text-white hover:bg-white hover:text-[#ff0000] transition-all duration-300 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      
      <div 
        className="w-full max-w-[95vw] overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: containerHeight }}
        onTouchStart={() => { isTouch.current = true; }}
      >
        <div 
          className="flex items-start transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentTeamIndex * 100}%)` }}
        >
          {TEAMS_DATA.map((team, index) => (
            <div 
              key={index} 
              ref={el => teamRefs.current[index] = el}
              className="w-full shrink-0 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-6 w-full px-4 items-start">
                
                {team.members ? (
                    team.members.map((member, i) => (
                        <FlipMemberCard 
                            key={i} 
                            member={member}
                            onHoverStart={() => setIsPaused(true)}
                            onHoverEnd={() => setIsPaused(false)}
                        />
                    ))
                ) : (
                    Array.from({ length: team.count }).map((_, i) => (
                        <FlipMemberCard 
                            key={i} 
                            // No member prop passed, uses dummy fallback
                            onHoverStart={() => setIsPaused(true)}
                            onHoverEnd={() => setIsPaused(false)}
                        />
                    ))
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Teams2;