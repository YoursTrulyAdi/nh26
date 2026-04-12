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
];

const MemberCard = ({ member, onHoverStart, onHoverEnd }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const data = member || {
    name: 'Team Member',
    role: 'Member',
    image: '/assets/dummy.png',
    socials: {}
  };

  const socialLinks = data.socials || {};

  return (
    <motion.div
      ref={cardRef}
      className="relative w-70 h-95 group shrink-0 cursor-pointer rounded-2xl"
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd?.();
      }}
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered
          ? '0 20px 40px rgba(241, 117, 117, 0.25), 0 0 60px rgba(255, 0, 0, 0.15)'
          : '0 8px 16px rgba(0, 0, 0, 0.15)'
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/90"></div>
      </div>

      {/* Vertical Text - Name and Role on Hover */}
      <motion.div
        className="absolute top-10 left-13.5 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ transform: 'rotate(-90deg) translateY(-100%) translateX(-100%)', transformOrigin: 'left top' }}>
          <h4 className="text-lg font-bold text-white font-['PPMori'] whitespace-nowrap text-right">
            {data.name}
          </h4>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-10 left-13.5 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ transform: 'rotate(-90deg) translateY(-100%) translateX(-100%)', transformOrigin: 'left top', marginLeft: '1rem' }}>
          <p className="text-sm font-semibold text-[#ff0000] uppercase font-['PPMori'] whitespace-nowrap text-right">
            {data.role}
          </p>
        </div>
      </motion.div>

      {/* Social Buttons - Top Right */}
      <motion.div
        className="absolute top-4 right-4 flex flex-col gap-3 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {socialLinks.instagram && (
          <motion.a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>
        )}
        {socialLinks.linkedin && (
          <motion.a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </motion.a>
        )}
        {socialLinks.twitter && (
          <motion.a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </motion.a>
        )}
      </motion.div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        {/* Top Accent Line */}
        <div className="h-1 w-12 bg-linear-to-r from-[#ff0000] to-[#ff3333] rounded-full"></div>
      </div>

      {/* Corner Glow Effect on Hover */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-[#ff0000]/10 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </motion.div>
  );
};

const Teams3 = () => {
  const [selectedDept, setSelectedDept] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full relative z-10 flex flex-col items-center justify-center bg-[#010524ff] py-20 min-h-screen overflow-hidden">
      <Starfield />
      <div className="absolute inset-0 bg-linear-to-b from-[#010524ff] via-transparent to-[#010524ff] z-0 pointer-events-none opacity-80"></div>

      <div className="max-w-[90vw] xl:max-w-7xl mx-auto px-6 relative z-10 w-full mb-12 pt-4">
        <h2 className="text-3xl md:text-5xl text-[#f17575ff] font-bold text-center font-['PPMori'] tracking-tight">
            <span className="relative inline-block after:content-[''] after:absolute after:bottom-[-3] after:left-0 after:w-0 after:h-0.5 after:bg-[#f17575ff] after:transition-all after:duration-300 hover:after:w-full">
                Meet The Team
            </span>
        </h2>
      </div>

      {/* Department Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 relative z-20 px-4">
        {TEAMS_DATA.map((team, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedDept(index)}
            className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-['PPMori'] text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
              selectedDept === index
                ? 'bg-[#ff0000]/20 text-white backdrop-blur-sm border border-[#ff0000]/60 shadow-lg shadow-[#ff0000]/40'
                : 'bg-[#ff0000]/5 text-white/70 backdrop-blur-sm border border-[#ff0000]/30 hover:bg-[#ff0000]/15 hover:text-white hover:border-[#ff0000]/50'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {team.name}
          </motion.button>
        ))}
      </div>

      {/* Department Content */}
      <div className="w-full relative z-10 mb-8">
        <motion.div
          key={selectedDept}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-8 w-full px-4">
            {TEAMS_DATA[selectedDept].members.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Teams3;