"use client";

import React from "react";
import { IoVolumeHigh, IoVolumeLow } from "react-icons/io5";
import styles from "./MusicPlayer.module.css";

type VolumeControlProps = {
    value: number;
    onChange: (value: number) => void;
};

export function VolumeControl({ value, onChange }: VolumeControlProps) {
    return (
        <div className={styles.volumeRow}>
            <IoVolumeLow className={styles.volumeIcon} />
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className={styles.volumeSlider}
                aria-label="Volume"
            />
            <IoVolumeHigh className={styles.volumeIcon} />
        </div>
    );
}
