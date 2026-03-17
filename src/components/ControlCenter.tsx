import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import {
    IoWifi,
    IoBluetooth,
    IoMoon,
    IoSunny,
    IoVolumeHigh,
    IoCalculator,
    IoTimerOutline,
    IoCameraOutline,
    IoPlay,
    IoPlayForward,
    IoPlayBack
} from 'react-icons/io5';
import { MdCellTower } from "react-icons/md"; // AirDrop
import { TbBoxMultiple } from "react-icons/tb"; // Screen mirroring
import { PiRectangleDashed } from "react-icons/pi"; // Stage manager

export function ControlCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const shouldReduceMotion = useReducedMotion();

    // Toggle states for demonstration
    const [wifiOn, setWifiOn] = useState(true);
    const [btOn, setBtOn] = useState(true);
    const [airdropOn, setAirdropOn] = useState(true);
    const [focusOn, setFocusOn] = useState(false);

    // Liquid Glass Animation Variants
    const panelVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.92,
            y: -15,
            filter: 'blur(12px)',
            transformOrigin: 'top right'
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 24,
                stiffness: 300,
                mass: 0.8,
                duration: shouldReduceMotion ? 0 : 0.4
            }
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            y: -5,
            filter: 'blur(8px)',
            transition: {
                duration: shouldReduceMotion ? 0 : 0.25,
                ease: [0.25, 1, 0.5, 1] // Decelerating exit
            }
        }
    };

    const buttonVariants: Variants = {
        tap: { scale: 0.92 },
        hover: { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.18)' }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={panelVariants}
                    className="absolute top-[40px] right-[16px] w-[340px] rounded-[32px] p-4 text-white z-[9999] flex flex-col gap-3.5"
                    style={{
                        // Liquid Glass / Tahoe Spec
                        background: 'rgba(30, 30, 35, 0.35)',
                        backdropFilter: 'blur(65px) saturate(220%)',
                        WebkitBackdropFilter: 'blur(65px) saturate(220%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
                    }}
                >
                    {/* Specular Highlight Overlay for Liquid Edge */}
                    <div className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden z-[-1]">
                        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent opacity-60"></div>
                        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 transform pointer-events-none"></div>
                    </div>

                    {/* Top Row: Connections | Now Playing */}
                    <div className="flex gap-3.5 h-[146px]">
                        {/* Connectivity Controls */}
                        <div className="flex-1 flex flex-col gap-3.5 bg-[rgba(0,0,0,0.15)] rounded-[24px] p-3 shadow-inner border border-white/5 relative overflow-hidden">
                            <motion.div
                                whileTap="tap"
                                onClick={() => setWifiOn(!wifiOn)}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <motion.div
                                    animate={{ backgroundColor: wifiOn ? '#007AFF' : 'rgba(255,255,255,0.15)' }}
                                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-300"
                                >
                                    <IoWifi size={18} fill={wifiOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold leading-tight text-white/90">Wi-Fi</span>
                                    <span className="text-[11px] text-white/50 leading-tight">{wifiOn ? 'Home' : 'Off'}</span>
                                </div>
                            </motion.div>

                            <div className="flex gap-2 flex-1 mt-1">
                                <motion.div
                                    whileTap="tap"
                                    onClick={() => setBtOn(!btOn)}
                                    className={`flex-1 rounded-[16px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)] ${btOn ? 'bg-[#007AFF]' : 'bg-[rgba(255,255,255,0.15)]'}`}
                                >
                                    <IoBluetooth size={20} fill={btOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                                <motion.div
                                    whileTap="tap"
                                    onClick={() => setAirdropOn(!airdropOn)}
                                    className={`flex-1 rounded-[16px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)] ${airdropOn ? 'bg-[#007AFF]' : 'bg-[rgba(255,255,255,0.15)]'}`}
                                >
                                    <MdCellTower size={20} fill={airdropOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                            </div>
                        </div>

                        {/* Now Playing Widget */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-[24px] p-3 flex flex-col justify-between cursor-pointer border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)] relative overflow-hidden"
                        >
                            {/* Glass Bloom behind cover */}
                            <div className="absolute top-2 left-2 w-10 h-10 bg-orange-500/40 blur-xl rounded-full"></div>

                            <div className="flex gap-2.5 relative z-10">
                                <motion.div
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="w-[44px] h-[44px] rounded-[10px] bg-gradient-to-br from-red-500 to-orange-400 flex-shrink-0 relative overflow-hidden shadow-md"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[22px]">🌞</div>
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20"></div>
                                </motion.div>
                                <div className="flex flex-col justify-center overflow-hidden">
                                    <span className="text-[13px] font-semibold leading-tight truncate text-white/90">Besties</span>
                                    <span className="text-[11px] text-white/60 leading-tight truncate">Black Country...</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-2 text-white/80 mt-2 relative z-10">
                                <IoPlayBack size={18} className="cursor-pointer hover:text-white transition-colors" />
                                <IoPlay size={24} className="cursor-pointer hover:text-white transition-colors" />
                                <IoPlayForward size={18} className="cursor-pointer hover:text-white transition-colors" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Middle Row: Focus, Mirroring, Stage Manager */}
                    <div className="flex gap-3.5 h-[64px]">
                        <motion.div
                            whileTap="tap"
                            onClick={() => setFocusOn(!focusOn)}
                            className="flex-[2] bg-[rgba(255,255,255,0.1)] rounded-[24px] p-3 flex items-center gap-3 cursor-pointer border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] relative overflow-hidden transition-colors"
                            animate={{ backgroundColor: focusOn ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)' }}
                        >
                            <motion.div
                                animate={{ backgroundColor: focusOn ? '#5E5CE6' : 'rgba(255,255,255,0.15)' }}
                                className="w-[34px] h-[34px] rounded-full flex items-center justify-center shadow-sm"
                            >
                                <IoMoon size={18} fill="white" />
                            </motion.div>
                            <span className="text-[14px] font-semibold text-white/90">Focus</span>
                        </motion.div>
                        <motion.div whileTap="tap" whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-[24px] flex items-center justify-center cursor-pointer border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-white/90">
                            <TbBoxMultiple size={24} />
                        </motion.div>
                        <motion.div whileTap="tap" whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-[24px] flex items-center justify-center cursor-pointer border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-white/90">
                            <PiRectangleDashed size={24} />
                        </motion.div>
                    </div>

                    {/* Display & Sound Sliders Container */}
                    <div className="flex flex-col gap-3.5 bg-[rgba(0,0,0,0.15)] rounded-[24px] p-3.5 shadow-inner border border-white/5">

                        {/* Display Slider */}
                        <div className="flex items-center gap-3">
                            <IoSunny size={18} className="text-white/70" />
                            <div className="flex-1 h-[26px] bg-[rgba(255,255,255,0.15)] rounded-full relative overflow-hidden backdrop-blur-md shadow-inner">
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 bg-white/90 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                ></motion.div>
                            </div>
                        </div>

                        {/* Sound Slider */}
                        <div className="flex items-center gap-3">
                            <IoVolumeHigh size={18} className="text-white/70" />
                            <div className="flex-1 h-[26px] bg-[rgba(255,255,255,0.15)] rounded-full relative overflow-hidden backdrop-blur-md shadow-inner">
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 bg-white/90 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "50%" }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Utility Tools */}
                    <div className="flex justify-between h-[54px] gap-3.5">
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center cursor-pointer border border-white/10 shadow-sm text-white/90">
                            <div className="w-[20px] h-[20px] rounded-full border border-white/60 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 right-1/2 bg-white/90"></div>
                            </div>
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center cursor-pointer border border-white/10 shadow-sm text-white/90">
                            <IoCalculator size={22} />
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center cursor-pointer border border-white/10 shadow-sm text-white/90">
                            <IoTimerOutline size={22} />
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center cursor-pointer border border-white/10 shadow-sm text-white/90">
                            <IoCameraOutline size={22} />
                        </motion.div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
