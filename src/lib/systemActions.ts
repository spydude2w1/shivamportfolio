"use client";

export const RESUME_URL = "/ShivamBiswalResume.pdf";
export const RESUME_FILENAME = "ShivamBiswalResume.pdf";
export const RESUME_FILE_SIZE_BYTES = 863298;

export function openResumePdf() {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
}

export function downloadFile(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadResumePdf() {
    downloadFile(RESUME_URL, RESUME_FILENAME);
}

export function formatFileSize(bytes: number) {
    if (bytes < 1024) {
        return `${bytes} bytes`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatDuration(totalSeconds: number) {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
