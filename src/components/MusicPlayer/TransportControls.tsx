import { motion } from "framer-motion";
import { IoPause, IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import styles from "./MusicPlayer.module.css";

type TransportControlsProps = {
    isPlaying: boolean;
    onRestart: () => void;
    onBackTen: () => void;
    onPlayPause: () => void;
    onForwardTen: () => void;
    onSkipToEnd: () => void;
};

export function TransportControls({
    isPlaying,
    onRestart,
    onBackTen,
    onPlayPause,
    onForwardTen,
    onSkipToEnd
}: TransportControlsProps) {
    return (
        <div className={styles.transportRow}>
            <TransportButton label="Restart" onClick={onRestart}>
                <TbPlayerTrackPrev />
            </TransportButton>
            <TransportButton label="Back 10 seconds" onClick={onBackTen}>
                <IoPlaySkipBack />
            </TransportButton>
            <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                type="button"
                className={`${styles.transportButton} ${styles.transportPrimary} ${isPlaying ? styles.transportPrimaryActive : ""}`}
                onClick={onPlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <IoPause /> : <IoPlay />}
            </motion.button>
            <TransportButton label="Forward 10 seconds" onClick={onForwardTen}>
                <IoPlaySkipForward />
            </TransportButton>
            <TransportButton label="Skip to end" onClick={onSkipToEnd}>
                <TbPlayerTrackNext />
            </TransportButton>
        </div>
    );
}

function TransportButton({
    children,
    label,
    onClick
}: {
    children: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            type="button"
            className={styles.transportButton}
            onClick={onClick}
            aria-label={label}
        >
            {children}
        </motion.button>
    );
}
