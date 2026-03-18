"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoPause, IoPlay, IoRepeat, IoShuffle, IoPlayBack, IoPlayForward } from "react-icons/io5";
import { motion, AnimatePresence, useReducedMotion, useDragControls } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { TransportControls } from "./TransportControls";
import { Visualizer } from "./Visualizer";
import { VolumeControl } from "./VolumeControl";
import { formatDuration } from "../../lib/systemActions";
import styles from "./MusicPlayer.module.css";

const TRACK_DURATION = 299;
const START_OFFSET = 221;
const DEFAULT_SIZE = { width: 860, height: 560 };
const EXPANDED_SIZE = { width: 1040, height: 680 };

type MusicPlayerProps = {
    isVisible: boolean;
    onClose: () => void;
};

export function MusicPlayer({ isVisible, onClose }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const toastTimeoutRef = useRef<number | null>(null);
    const dragStateRef = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isShuffleOn, setIsShuffleOn] = useState(false);
    const [isRepeatOn, setIsRepeatOn] = useState(false);
    const [currentTime, setCurrentTime] = useState(START_OFFSET);
    const [duration, setDuration] = useState(TRACK_DURATION);
    const [volume, setVolume] = useState(0.10);
    const [userAdjustedVolume, setUserAdjustedVolume] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [position, setPosition] = useState({ x: 120, y: 80 });
    const [isAutoCompact, setIsAutoCompact] = useState(false);

    // Audio Safety Check (2-point)
    // 1. On Mount/Init: Ensure volume is strictly 10%
    // 2. On Playback Start: Re-verify volume hasn't jumped
    useEffect(() => {
        if (!userAdjustedVolume) {
            setVolume(0.10);
        }
    }, [isVisible, userAdjustedVolume]);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        setUserAdjustedVolume(true);
    };

    const size = isExpanded ? EXPANDED_SIZE : DEFAULT_SIZE;
    const showCompact = isVisible && (isMinimized || isAutoCompact);
    const titleBars = useMemo(() => Array.from({ length: 3 }), []);

    useEffect(() => {
        const handleCommand = (e: any) => {
            const cmd = e.detail;
            if (cmd === "toggle") void togglePlayback();
            if (cmd === "next") {
                const audio = audioRef.current;
                if (audio) {
                    audio.currentTime = Math.min(audio.currentTime + 10, duration);
                    setCurrentTime(audio.currentTime);
                }
            }
            if (cmd === "prev") {
                const audio = audioRef.current;
                if (audio) {
                    audio.currentTime = Math.max(audio.currentTime - 10, START_OFFSET);
                    setCurrentTime(audio.currentTime);
                }
            }
        };
        window.addEventListener("music-command", handleCommand);
        return () => window.removeEventListener("music-command", handleCommand);
    }, [isPlaying, currentTime, duration]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("music-state", { detail: { isPlaying } }));
    }, [isPlaying]);

    useEffect(() => {
        const setResponsiveState = () => {
            const compact = window.innerWidth < 768;
            const nextSize = isExpanded ? EXPANDED_SIZE : DEFAULT_SIZE;
            setIsAutoCompact(compact);
            setPosition({
                x: Math.max(24, Math.min(window.innerWidth - nextSize.width - 24, window.innerWidth / 2 - nextSize.width / 2)),
                y: compact ? 24 : Math.max(44, Math.min(window.innerHeight - nextSize.height - 120, 72))
            });
        };

        setResponsiveState();
        window.addEventListener("resize", setResponsiveState);
        return () => window.removeEventListener("resize", setResponsiveState);
    }, [isExpanded]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }

        const syncCurrentTime = () => {
            setCurrentTime(audio.currentTime || 0);
        };

        const handleMetadata = () => {
            const metadataDuration = Math.round(audio.duration || TRACK_DURATION);
            setDuration(metadataDuration);
            if (audio.currentTime < START_OFFSET) {
                audio.currentTime = START_OFFSET;
                setCurrentTime(START_OFFSET);
            }
        };

        const handleEnded = () => {
            if (isRepeatOn) {
                audio.currentTime = 0;
                void audio.play();
                setIsPlaying(true);
                return;
            }

            setIsPlaying(false);
        };

        audio.addEventListener("timeupdate", syncCurrentTime);
        audio.addEventListener("loadedmetadata", handleMetadata);
        audio.addEventListener("ended", handleEnded);

        const interval = window.setInterval(() => {
            if (!audio.paused) {
                syncCurrentTime();
            }
        }, 250);

        if (audio.readyState >= 1) {
            handleMetadata();
        }

        return () => {
            window.clearInterval(interval);
            audio.removeEventListener("timeupdate", syncCurrentTime);
            audio.removeEventListener("loadedmetadata", handleMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [isRepeatOn]);

    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current) {
                window.clearTimeout(toastTimeoutRef.current);
            }

            analyserRef.current?.disconnect();
            sourceRef.current?.disconnect();
            void audioContextRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) {
            // allow music to play in background when closed or minimized
            // setIsPlaying(false);
            // audioRef.current?.pause();
        }
    }, [isVisible]);

    const ensureAudioGraph = async () => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }

        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (!AudioContextClass) {
                return;
            }

            const context = new AudioContextClass();
            const analyser = context.createAnalyser();
            analyser.fftSize = 128;

            const source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);

            audioContextRef.current = context;
            analyserRef.current = analyser;
            sourceRef.current = source;
        }

        if (audioContextRef.current.state === "suspended") {
            await audioContextRef.current.resume();
        }
    };

    const showNowPlayingToast = () => {
        setShowToast(true);
        if (toastTimeoutRef.current) {
            window.clearTimeout(toastTimeoutRef.current);
        }
        toastTimeoutRef.current = window.setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }

        try {
            if (audio.paused) {
                if (audio.readyState === 0) {
                    audio.load();
                }
                if (audio.readyState >= 1 && audio.currentTime < START_OFFSET) {
                    audio.currentTime = START_OFFSET;
                }
                // 2-point safety check: Re-verify volume before playback starts
                if (!userAdjustedVolume) {
                    audio.volume = 0.10;
                    setVolume(0.10);
                }
                await ensureAudioGraph();
                await audio.play();
                setIsPlaying(true);
                showNowPlayingToast();
                return;
            }

            audio.pause();
            setIsPlaying(false);
        } catch (error) {
            console.error("Music playback failed", error);
            setIsPlaying(false);
        }
    };

    const seekTo = (nextTime: number) => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }

        audio.currentTime = Math.min(duration, Math.max(0, nextTime));
        setCurrentTime(audio.currentTime);
    };

    const windowDragControls = useDragControls();

    const shouldReduceMotion = useReducedMotion();

    const variants = {
        hidden: { opacity: 0, scale: 0.5, y: 400, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: "spring" as const,
                stiffness: 220,
                damping: 24,
                mass: 0.8,
                duration: shouldReduceMotion ? 0 : 0.45
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 100,
            filter: 'blur(20px)',
            transition: { 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as any
            }
        }
    };

    const compactVariants = {
        hidden: { opacity: 0, y: 40, x: "-50%", scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            x: "-50%",
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 280,
                damping: 22,
                duration: shouldReduceMotion ? 0 : 0.5
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            x: "-50%",
            scale: 0.95,
            transition: { duration: shouldReduceMotion ? 0 : 0.25 }
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <>
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={styles.toast}
                    >
                        <img src="/cover-image.jpg" alt="OK Computer album art" className={styles.toastArt} />
                        <div>
                            <div className={styles.toastLabel}>Now Playing</div>
                            <div className={styles.toastText}>Let Down (Remastered) - Radiohead</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {showCompact ? (
                    <motion.div
                        key="compact"
                        variants={compactVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className={styles.compactPlayer}
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className={styles.compactInfo}
                            onClick={() => {
                                if (!isAutoCompact) {
                                    setIsMinimized(false);
                                }
                            }}
                        >
                            <img src="/cover-image.jpg" alt="OK Computer album art" className={styles.compactArt} />
                            <div className={styles.compactMeta}>
                                <span>Let Down (Remastered)</span>
                                <span>Radiohead</span>
                            </div>
                        </motion.button>

                        <div className={styles.compactControls}>
                            <motion.button
                                whileHover={{ scale: 1.1, color: "#fff" }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                className={styles.compactSecondaryAction}
                                onClick={() => seekTo(currentTime - 10)}
                            >
                                <IoPlayBack />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.85 }}
                                type="button"
                                className={styles.compactAction}
                                onClick={() => void togglePlayback()}
                            >
                                {isPlaying ? <IoPause /> : <IoPlay />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1, color: "#fff" }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                className={styles.compactSecondaryAction}
                                onClick={() => seekTo(currentTime + 10)}
                            >
                                <IoPlayForward />
                            </motion.button>
                        </div>

                        {!isAutoCompact && (
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className={styles.compactRestore}
                                onClick={() => setIsMinimized(false)}
                            >
                                Open
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="full"
                        drag
                        dragControls={windowDragControls}
                        dragListener={false}
                        dragMomentum={false}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`${styles.playerWindow} ${isExpanded ? styles.playerExpanded : ""}`}
                        style={{ width: size.width, height: size.height }}
                    >
                        <div
                            className={styles.titleBar}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                windowDragControls.start(e);
                            }}
                        >
                            <div className={styles.trafficLights}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    type="button"
                                    className={`${styles.trafficLight} ${styles.closeLight}`}
                                    data-window-control="true"
                                    aria-label="Close player"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onClose();
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    type="button"
                                    className={`${styles.trafficLight} ${styles.minimizeLight}`}
                                    data-window-control="true"
                                    aria-label="Minimize player"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setIsMinimized(true);
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    type="button"
                                    className={`${styles.trafficLight} ${styles.expandLight}`}
                                    data-window-control="true"
                                    aria-label="Toggle expanded player"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setIsExpanded((value) => !value);
                                    }}
                                />
                            </div>
                            <div className={styles.titleContent}>
                                <span>Music</span>
                                {isPlaying && (
                                    <div className={styles.equalizer} aria-hidden="true">
                                        {titleBars.map((_, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.12}s` }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.playerBody}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className={styles.leftPanel}
                            >
                                <motion.div
                                    animate={isPlaying ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                                    transition={isPlaying ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.2 }}
                                    className={styles.albumShell}
                                >
                                    <img
                                        src="/cover-image.jpg"
                                        alt="OK Computer album art"
                                        className={`${styles.albumArt} ${isPlaying ? styles.albumArtSpinning : ""}`}
                                    />
                                </motion.div>
                                <div className={styles.albumCaption}>OK Computer</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className={styles.rightPanel}
                            >
                                <div className={styles.trackMeta}>
                                    <motion.h2 layout>{`Let Down (Remastered)`}</motion.h2>
                                    <motion.p layout>Radiohead</motion.p>
                                    <motion.span layout>OK Computer</motion.span>
                                </div>

                                <Visualizer analyser={analyserRef.current} isPlaying={isPlaying} />

                                <ProgressBar currentTime={currentTime} duration={duration} onSeek={seekTo} />

                                <div className={styles.controlStrip}>
                                    <div className={styles.modeButtons}>
                                        <motion.button
                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                            type="button"
                                            className={`${styles.modeButton} ${isShuffleOn ? styles.modeButtonActive : ""}`}
                                            onClick={() => setIsShuffleOn((value) => !value)}
                                            aria-pressed={isShuffleOn}
                                        >
                                            <IoShuffle />
                                            <span>Shuffle</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                            type="button"
                                            className={`${styles.modeButton} ${isRepeatOn ? styles.modeButtonActive : ""}`}
                                            onClick={() => setIsRepeatOn((value) => !value)}
                                            aria-pressed={isRepeatOn}
                                        >
                                            <IoRepeat />
                                            <span>Repeat</span>
                                        </motion.button>
                                    </div>

                                    <TransportControls
                                        isPlaying={isPlaying}
                                        onRestart={() => seekTo(0)}
                                        onBackTen={() => seekTo(currentTime - 10)}
                                        onPlayPause={() => void togglePlayback()}
                                        onForwardTen={() => seekTo(currentTime + 10)}
                                        onSkipToEnd={() => seekTo(Math.max(duration - 0.1, 0))}
                                    />
                                </div>

                                <div className={styles.footerRow}>
                                    <VolumeControl value={volume} onChange={handleVolumeChange} />
                                    <div className={styles.durationLabel}>Duration {formatDuration(duration)}</div>
                                </div>
                            </motion.div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            <audio ref={audioRef} src="/letdown.mp3" preload="metadata" />
        </>
    );
}
