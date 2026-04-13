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
        color: "#ff1493",
        accentColor: "from-pink-500/20 to-pink-500/5",
        image: '/assets/TrackPics/track-1.jpg',
    },
    {
        title: "IOT",
        description: "Witness the convergence of software and hardware to implement solutions that leverage the power of IoT.",
        icon: Cpu,
        color: "#00d4ff",
        accentColor: "from-cyan-500/20 to-cyan-500/5",
        image: '/assets/TrackPics/track-2.jpg',
    },
    {
        title: "AI & ML",
        description: "Push the boundaries of intelligent systems in the cutting-edge world of AI & ML.",
        icon: BrainCircuit,
        color: "#00ff88",
        accentColor: "from-emerald-500/20 to-emerald-500/5",
        image: '/assets/TrackPics/track-3.jpg',
    },
    {
        title: "Blockchain / Cybersecurity",
        description: "Secure decentralized systems and protect digital assets in the evolving landscape of Web3 and security.",
        icon: ShieldCheck,
        color: "#ffaa00",
        accentColor: "from-amber-500/20 to-amber-500/5",
        image: '/assets/TrackPics/track-4.jpg',
    },
    {
        title: "Open Innovation",
        description: "Embrace the freedom to explore tech frontiers, fostering ideas that break boundaries.",
        icon: Lightbulb,
        color: "#ff4500",
        accentColor: "from-orange-500/20 to-orange-500/5",
        image: '/assets/TrackPics/track-5.jpg',
    }
];

const TrackCard = ({ track }) => {
    const { title, description, icon: Icon, color, accentColor, image } = track;

    return (
        <div 
            className="track-card relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-full"
            style={{
                boxShadow: `0 10px 30px ${color}35, 0 0 20px ${color}25`
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
                        box-shadow: 0 10px 30px ${color}30, 0 0 20px ${color}20;
                    }
                    50% {
                        box-shadow: 0 15px 50px ${color}50, 0 0 40px ${color}40;
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
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/75 to-black/95"></div>
            </div>

            <div 
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                style={{
                    background: color,
                    boxShadow: `0 4px 20px ${color}60`
                }}
            ></div>

            <div className={`absolute inset-0 bg-linear-to-br ${accentColor} transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-8">
                <div className="mb-6">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-xl border-2 transition-all duration-300 group-hover:scale-110"
                        style={{
                            background: `${color}25`,
                            borderColor: color,
                            boxShadow: `0 0 20px ${color}40, inset 0 0 10px ${color}20`
                        }}
                    >
                        <Icon className="w-8 h-8" style={{ color }} />
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-3xl font-black text-white mb-3 leading-tight group-hover:-translate-y-1 transition-transform duration-300">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-200 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {description}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2">
                    <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 10px ${color}`
                        }}
                    ></div>
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Active Track</span>
                </div>
            </div>
        </div>
    );
};

const FillerBox = () => {
    return (
        <div 
            className="filler-box relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center p-8 text-center"
            style={{
                background: 'linear-gradient(135deg, #010524 0%, #1a0a3d 100%)',
                boxShadow: '0 10px 30px rgba(241, 117, 117, 0.2)',
                border: '2px solid rgba(241, 117, 117, 0.3)'
            }}
        >
            <style>{`
                .filler-box:hover {
                    box-shadow: 0 15px 50px rgba(241, 117, 117, 0.4), 0 0 40px rgba(241, 117, 117, 0.3);
                }
            `}</style>

            <div className="absolute inset-0 bg-linear-to-br from-[#f17575]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#f17575]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-xl border-2 mx-auto transition-all duration-300 group-hover:scale-110"
                        style={{
                            background: '#f1757525',
                            borderColor: '#f17575ff',
                            boxShadow: '0 0 20px #f1757540'
                        }}
                    >
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300 inline-block">✨</span>
                    </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#f17575] transition-colors duration-300">
                    Explore the
                    <span className="block bg-linear-to-r from-[#ff1493] via-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent group-hover:from-[#ff1493] group-hover:via-[#f17575] group-hover:to-[#ff6b9d]">
                        Tracks
                    </span>
                </h2>
                
                <p className="text-sm text-gray-300 leading-relaxed mt-4 group-hover:text-gray-200 transition-colors duration-300">
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

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 relative z-10 w-full md:grid-rows-[1fr_1fr]" style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
                        <div className="col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 min-h-75">
                            <TrackCard track={tracksData[0]} />
                        </div>

                        <div className="hidden md:block md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-2">
                            <TrackCard track={tracksData[1]} />
                        </div>

                        <div className="hidden md:block md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-2">
                            <FillerBox />
                        </div>

                        <div className="hidden md:block md:col-start-5 md:row-start-1 md:col-span-2 md:row-span-2">
                            <TrackCard track={tracksData[2]} />
                        </div>

                        <div className="hidden md:block md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-2">
                            <TrackCard track={tracksData[4]} />
                        </div>

                        <div className="hidden md:block md:col-start-5 md:row-start-3 md:col-span-2 md:row-span-2">
                            <TrackCard track={tracksData[3]} />
                        </div>

                        <div className="md:hidden col-span-2 min-h-75">
                            <TrackCard track={tracksData[1]} />
                        </div>
                        <div className="md:hidden col-span-2 min-h-75">
                            <TrackCard track={tracksData[2]} />
                        </div>
                        <div className="md:hidden col-span-2 min-h-75">
                            <TrackCard track={tracksData[3]} />
                        </div>
                        <div className="md:hidden col-span-2 min-h-75">
                            <TrackCard track={tracksData[4]} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tracks4;