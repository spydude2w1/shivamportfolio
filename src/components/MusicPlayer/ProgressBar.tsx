"use client";

import React, { useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";
import { formatDuration } from "../../lib/systemActions";

type ProgressBarProps = {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
};

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const updatePosition = (clientX: number) => {
        const track = trackRef.current;
        if (!track || duration <= 0) {
            return;
        }

        const rect = track.getBoundingClientRect();
        const percent = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        onSeek(percent * duration);
    };

    return (
        <div className={styles.progressBlock}>
            <div className={styles.progressMeta}>
                <span>{formatDuration(currentTime)}</span>
                <span>-{formatDuration(Math.max(0, duration - currentTime))}</span>
            </div>
            <div
                ref={trackRef}
                className={styles.progressTrack}
                onPointerDown={(event) => {
                    setIsScrubbing(true);
                    updatePosition(event.clientX);
                    event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                    if (isScrubbing) {
                        updatePosition(event.clientX);
                    }
                }}
                onPointerUp={(event) => {
                    setIsScrubbing(false);
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }}
            >
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                <div className={styles.progressThumb} style={{ left: `${progress}%` }} />
            </div>
        </div>
    );
}
