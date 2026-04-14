'use client';

import React from 'react';
import Image from 'next/image';
import { Gamepad2, Cpu, BrainCircuit, ShieldCheck, Lightbulb } from 'lucide-react';
import Starfield from './ui/Starfield';

const tracksData = [
    {
        title: "Game Dev",
        description: "Bring virtual worlds to life, crafting captivating and interactive gaming experiences.",
        icon: Gamepad2,
        color: "#e84b8a",
        accentColor: "from-pink-600/25 to-pink-600/10",
        image: '/assets/TrackPics/track-1.jpg',
    },
    {
        title: "IOT",
        description: "Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.",
        icon: Cpu,
        color: "#0ba5e9",
        accentColor: "from-blue-600/25 to-blue-600/10",
        image: '/assets/TrackPics/track-2.jpg',
    },
    {
        title: "AI & ML",
        description: "Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.",
        icon: BrainCircuit,
        color: "#16a34a",
        accentColor: "from-green-600/25 to-green-600/10",
        image: '/assets/TrackPics/track-3.jpg',
    },
    {
        title: "Blockchain / Cybersecurity",
        description: "Secure decentralized systems and protect digital assets in the evolving landscape of Web3 and security.",
        icon: ShieldCheck,
        color: "#ca8a04",
        accentColor: "from-amber-600/25 to-amber-600/10",
        image: '/assets/TrackPics/track-4.jpg',
    },
    {
        title: "Open Innovation",
        description: "Embrace the freedom to explore tech frontiers, fostering ideas that break boundaries.",
        icon: Lightbulb,
        color: "#dc2626",
        accentColor: "from-red-600/25 to-red-600/10",
        image: '/assets/TrackPics/track-5.jpg',
    }
];

const TrackCard = ({ track }) => {
    const { title, description, icon: Icon, color, accentColor, image } = track;

    return (
        <div 
            className="track-card relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 h-72"
            style={{
                boxShadow: `0 10px 30px ${color}30, 0 0 20px ${color}20`
            }}
        >
            <style>{`
                .track-card-${title.replace(/\s+/g, '-').toLowerCase()} {
                    animation: none;
                }
                .track-card-${title.replace(/\s+/g, '-').toLowerCase()}:hover {
                    animation: glow-pulse-${title.replace(/\s+/g, '-').toLowerCase()} 2s ease-in-out infinite;
                }
                @keyframes glow-pulse-${title.replace(/\s+/g, '-').toLowerCase()} {
                    0%, 100% {
                        box-shadow: 0 10px 30px ${color}25, 0 0 20px ${color}15;
                    }
                    50% {
                        box-shadow: 0 15px 40px ${color}40, 0 0 30px ${color}30;
                    }
                }
            `}</style>

            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
            </div>

            <div 
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                style={{
                    background: color,
                    boxShadow: `0 4px 20px ${color}50`,
                    opacity: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            ></div>

            <div className={`absolute inset-0 bg-linear-to-br ${accentColor} transition-opacity duration-500 opacity-0 group-hover:opacity-100`}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Icon - Hidden by default, visible on hover */}
                <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                    <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-500"
                        style={{
                            background: `${color}20`,
                            borderColor: color,
                            boxShadow: `0 0 16px ${color}40, inset 0 0 8px ${color}20`
                        }}
                    >
                        <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                </div>

                {/* Title - Centered by default, positioned on hover with smooth transition */}
                <div className="flex-1 flex items-center justify-center group-hover:justify-start transition-all duration-500">
                    <h3 className="text-2xl font-black text-white text-center group-hover:text-left leading-tight transition-all duration-500">
                        {title}
                    </h3>
                </div>

                {/* Description - Hidden by default, visible on hover */}
                <div className="opacity-0 group-hover:opacity-90 transition-all duration-500 group-hover:mb-4 transform group-hover:translate-y-0 translate-y-2">
                    <p className="text-xs text-gray-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Active Track Pill - Hidden by default, visible on hover */}
                <div className="pt-3 border-t border-white/15 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                    <div 
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 8px ${color}`
                        }}
                    ></div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Active Track</span>
                </div>
            </div>
        </div>
    );
};

const FillerBox = () => {
    return (
        <div 
            className="filler-box relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 h-72 flex flex-col items-center justify-center p-6 text-center"
            style={{
                background: 'rgba(15, 3, 32, 0.6)',
                border: '2px solid rgba(241, 117, 117, 0.3)',
                boxShadow: '0 8px 32px rgba(241, 117, 117, 0.2), inset 0 1px 1px rgba(241, 117, 117, 0.15)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <style>{`
                .filler-box:hover {
                    box-shadow: 0 15px 40px rgba(241, 117, 117, 0.3), 0 0 30px rgba(241, 117, 117, 0.25);
                }
            `}</style>

            <div className="relative z-10">
                <div className="mb-4">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center backdrop-blur-xl border-2 mx-auto transition-all duration-300"
                        style={{
                            background: 'rgba(241, 117, 117, 0.2)',
                            borderColor: 'rgba(241, 117, 117, 1)',
                            boxShadow: '0 0 16px rgba(241, 117, 117, 0.4)'
                        }}
                    >
                        <span className="text-xl">✨</span>
                    </div>
                </div>
                
                <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                    Explore the
                    <span className="block text-cyan-400">
                        Tracks
                    </span>
                </h2>
                
                <p className="text-xs text-gray-400 leading-relaxed">
                    Five tracks. One hackathon. Endless possibilities — find the domain where you'll build, break, and innovate.
                </p>
            </div>
        </div>
    );
};

const Tracks4 = () => {
    return (
        <section className="py-24 bg-[#010524ff] relative overflow-hidden">
            <Starfield />
            <div className="absolute inset-0 bg-linear-to-b from-[#010524ff] via-transparent to-[#010524ff] z-0 pointer-events-none opacity-80"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-[#f17575]/20 bg-linear-to-br from-[#0f0320]/60 via-[#1a0a3d]/40 to-[#010524]/60"
                    style={{
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(241, 117, 117, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div 
                        className="absolute inset-0 rounded-3xl pointer-events-none hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'linear-gradient(135deg, rgba(241, 117, 117, 0.1) 0%, transparent 50%, rgba(0, 212, 255, 0.05) 100%)',
                            opacity: 0
                        }}
                    ></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
                        <TrackCard track={tracksData[0]} />
                        <FillerBox />
                        <TrackCard track={tracksData[1]} />
                        <TrackCard track={tracksData[2]} />
                        <TrackCard track={tracksData[3]} />
                        <TrackCard track={tracksData[4]} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracks4;