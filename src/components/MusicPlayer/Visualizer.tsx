"use client";

import React, { useEffect, useRef } from "react";
import styles from "./MusicPlayer.module.css";

type VisualizerProps = {
    analyser: AnalyserNode | null;
    isPlaying: boolean;
};

export function Visualizer({ analyser, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !analyser) {
            return;
        }

        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        const resizeCanvas = () => {
            const ratio = window.devicePixelRatio || 1;
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = Math.floor(width * ratio);
            canvas.height = Math.floor(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let frameId = 0;

        const draw = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            context.clearRect(0, 0, width, height);
            context.fillStyle = "#111111";
            context.fillRect(0, 0, width, height);

            if (isPlaying) {
                analyser.getByteFrequencyData(dataArray);
            }

            const bars = 48;
            const gap = 4;
            const barWidth = Math.max(4, (width - gap * (bars - 1)) / bars);
            const step = Math.max(1, Math.floor(dataArray.length / bars));

            for (let index = 0; index < bars; index += 1) {
                const sample = dataArray[index * step] ?? 0;
                const normalized = isPlaying ? sample / 255 : 0.04;
                const barHeight = Math.max(8, normalized * (height - 18));
                const x = index * (barWidth + gap);
                const y = height - barHeight;

                const gradient = context.createLinearGradient(0, height, 0, y);
                gradient.addColorStop(0, "#29d15f");
                gradient.addColorStop(0.55, "#f8cf4f");
                gradient.addColorStop(1, "#f25353");

                context.fillStyle = gradient;
                drawRoundedBar(context, x, y, barWidth, barHeight, 6);
            }

            frameId = window.requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [analyser, isPlaying]);

    return (
        <div className={styles.visualizerFrame}>
            <canvas ref={canvasRef} className={styles.visualizerCanvas} />
            <div className={styles.visualizerScanlines} />
        </div>
    );
}

function drawRoundedBar(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    const r = Math.min(radius, width / 2, height / 2);

    context.beginPath();
    context.moveTo(x, y + height);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.lineTo(x + width - r, y);
    context.quadraticCurveTo(x + width, y, x + width, y + r);
    context.lineTo(x + width, y + height);
    context.closePath();
    context.fill();
}
