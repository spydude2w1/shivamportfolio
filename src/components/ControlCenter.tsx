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
    IoPause,
    IoPlayForward,
    IoPlayBack
} from 'react-icons/io5';
import { MdCellTower } from "react-icons/md";
import { TbBoxMultiple } from "react-icons/tb";
import { PiRectangleDashed } from "react-icons/pi";

export function ControlCenter({
    isOpen,
    onClose,
    onToggleMusic,
    isMusicOpen
}: {
    isOpen: boolean,
    onClose: () => void,
    onToggleMusic: () => void,
    isMusicOpen: boolean
}) {
    const shouldReduceMotion = useReducedMotion();
    const [wifiOn, setWifiOn] = useState(true);
    const [btOn, setBtOn] = useState(true);
    const [airdropOn, setAirdropOn] = useState(true);
    const [focusOn, setFocusOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    React.useEffect(() => {
        const handleState = (e: any) => setIsPlaying(e.detail.isPlaying);
        window.addEventListener("music-state", handleState);
        return () => window.removeEventListener("music-state", handleState);
    }, []);

    const sendCommand = (cmd: string) => {
        window.dispatchEvent(new CustomEvent("music-command", { detail: cmd }));
    };

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
                ease: [0.25, 1, 0.5, 1]
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
                    className="absolute top-[40px] right-[16px] z-[9999] flex w-[340px] flex-col gap-3.5 rounded-[32px] p-4 text-white"
                    style={{
                        background: 'rgba(30, 30, 35, 0.35)',
                        backdropFilter: 'blur(16px) saturate(220%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(220%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden rounded-[32px]">
                        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent opacity-60"></div>
                        <div className="absolute -inset-[100%] rotate-45 transform bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                    </div>

                    <div className="flex h-[146px] gap-3.5">
                        <div className="relative flex flex-1 flex-col gap-3.5 overflow-hidden rounded-[24px] border border-white/5 bg-[rgba(0,0,0,0.15)] p-3 shadow-inner">
                            <motion.div whileTap="tap" onClick={() => setWifiOn(!wifiOn)} className="group flex cursor-pointer items-center gap-3">
                                <motion.div
                                    animate={{ backgroundColor: wifiOn ? '#007AFF' : 'rgba(255,255,255,0.15)' }}
                                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-300"
                                >
                                    <IoWifi size={18} fill={wifiOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold leading-tight text-white/90">Wi-Fi</span>
                                    <span className="text-[11px] leading-tight text-white/50">{wifiOn ? 'Home' : 'Off'}</span>
                                </div>
                            </motion.div>

                            <div className="mt-1 flex flex-1 gap-2">
                                <motion.div
                                    whileTap="tap"
                                    onClick={() => setBtOn(!btOn)}
                                    className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-300 ${btOn ? 'bg-[#007AFF]' : 'bg-[rgba(255,255,255,0.15)]'}`}
                                >
                                    <IoBluetooth size={20} fill={btOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                                <motion.div
                                    whileTap="tap"
                                    onClick={() => setAirdropOn(!airdropOn)}
                                    className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-300 ${airdropOn ? 'bg-[#007AFF]' : 'bg-[rgba(255,255,255,0.15)]'}`}
                                >
                                    <MdCellTower size={20} fill={airdropOn ? "white" : "rgba(255,255,255,0.7)"} />
                                </motion.div>
                            </div>
                        </div>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                onToggleMusic();
                                onClose();
                            }}
                            className="relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.1)] p-3 text-left shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                        >
                            <div className="absolute top-2 left-2 h-10 w-10 rounded-full bg-orange-500/40 blur-xl"></div>
                            <div className="relative z-10 flex gap-2.5">
                                <motion.img
                                    src="/cover-image.jpg"
                                    alt="OK Computer album art"
                                    animate={isMusicOpen ? { rotate: 360 } : { rotate: 0 }}
                                    transition={isMusicOpen ? { repeat: Infinity, duration: 10, ease: "linear" } : { duration: 0.2 }}
                                    className="h-[44px] w-[44px] flex-shrink-0 rounded-[10px] object-cover shadow-md"
                                />
                                <div className="flex flex-col justify-center overflow-hidden">
                                    <span className="truncate text-[13px] font-semibold leading-tight text-white/90">Let Down (Remastered)</span>
                                    <span className="truncate text-[11px] leading-tight text-white/60">Radiohead</span>
                                </div>
                            </div>
                            <div className="relative z-10 mt-2 flex items-center justify-between px-2 text-white/80">
                                <motion.div 
                                    whileHover={{ scale: 1.15, color: 'white' }} 
                                    whileTap={{ scale: 0.85 }}
                                    onClick={(e) => { e.stopPropagation(); sendCommand("prev"); }}
                                >
                                    <IoPlayBack size={18} className="cursor-pointer" />
                                </motion.div>
                                <motion.div 
                                    whileHover={{ scale: 1.15, color: 'white' }} 
                                    whileTap={{ scale: 0.85 }}
                                    onClick={(e) => { e.stopPropagation(); sendCommand("toggle"); }}
                                >
                                    {isPlaying ? <IoPause size={24} className="cursor-pointer" /> : <IoPlay size={24} className="cursor-pointer" />}
                                </motion.div>
                                <motion.div 
                                    whileHover={{ scale: 1.15, color: 'white' }} 
                                    whileTap={{ scale: 0.85 }}
                                    onClick={(e) => { e.stopPropagation(); sendCommand("next"); }}
                                >
                                    <IoPlayForward size={18} className="cursor-pointer" />
                                </motion.div>
                            </div>
                        </motion.button>
                    </div>

                    <div className="flex h-[64px] gap-3.5">
                        <motion.div
                            whileTap="tap"
                            onClick={() => setFocusOn(!focusOn)}
                            className="relative flex flex-[2] cursor-pointer items-center gap-3 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.1)] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-colors"
                            animate={{ backgroundColor: focusOn ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)' }}
                        >
                            <motion.div
                                animate={{ backgroundColor: focusOn ? '#5E5CE6' : 'rgba(255,255,255,0.15)' }}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-full shadow-sm"
                            >
                                <IoMoon size={18} fill="white" />
                            </motion.div>
                            <span className="text-[14px] font-semibold text-white/90">Focus</span>
                        </motion.div>
                        <motion.div whileTap="tap" whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="flex flex-1 cursor-pointer items-center justify-center rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                            <TbBoxMultiple size={24} />
                        </motion.div>
                        <motion.div whileTap="tap" whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="flex flex-1 cursor-pointer items-center justify-center rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                            <PiRectangleDashed size={24} />
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-3.5 rounded-[24px] border border-white/5 bg-[rgba(0,0,0,0.15)] p-3.5 shadow-inner">
                        <div className="flex items-center gap-3">
                            <IoSunny size={18} className="text-white/70" />
                            <div className="relative h-[26px] flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.15)] shadow-inner backdrop-blur-md">
                                <motion.div
                                    className="absolute top-0 bottom-0 left-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                ></motion.div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <IoVolumeHigh size={18} className="text-white/70" />
                            <div className="relative h-[26px] flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.15)] shadow-inner backdrop-blur-md">
                                <motion.div
                                    className="absolute top-0 bottom-0 left-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "50%" }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="flex h-[54px] justify-between gap-3.5">
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-sm">
                            <div className="relative h-[20px] w-[20px] overflow-hidden rounded-full border border-white/60">
                                <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-white/90"></div>
                            </div>
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-sm">
                            <IoCalculator size={22} />
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-sm">
                            <IoTimerOutline size={22} />
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.1)] text-white/90 shadow-sm">
                            <IoCameraOutline size={22} />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
