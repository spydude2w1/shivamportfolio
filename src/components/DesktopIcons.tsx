"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IoDocumentText, IoFolder, IoTerminal } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
    RESUME_FILENAME,
    RESUME_FILE_SIZE_BYTES,
    downloadResumePdf,
    formatFileSize,
    openResumePdf
} from "../lib/systemActions";

type ContextMenuState = {
    x: number;
    y: number;
} | null;

export function DesktopIcons() {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
    const [showInspector, setShowInspector] = useState(false);
    const [resumeSize, setResumeSize] = useState(formatFileSize(RESUME_FILE_SIZE_BYTES));

    const icons = [
        { name: "biswal-os.app", icon: <img src="/icons/terminal-2021-06-03.webp" className="w-[42px] h-[42px]" alt="biswal-os.app" />, kind: "app" },
        { name: "Resume.pdf", icon: <IoDocumentText size={34} className="text-white" />, kind: "resume" },
        { name: "firsttrack-ai", icon: <IoFolder size={36} className="text-[#6cb6ff]" />, kind: "folder" }
    ];

    useEffect(() => {
        const clearMenus = () => {
            setSelectedIcon(null);
            setContextMenu(null);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setContextMenu(null);
                setShowInspector(false);
                setSelectedIcon(null);
            }
        };

        document.addEventListener("click", clearMenus);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("click", clearMenus);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        const loadResumeSize = async () => {
            try {
                const response = await fetch("/ShivamBiswalResume.pdf", { method: "HEAD" });
                const length = response.headers.get("content-length");
                if (length) {
                    setResumeSize(formatFileSize(Number(length)));
                }
            } catch {
                setResumeSize(formatFileSize(RESUME_FILE_SIZE_BYTES));
            }
        };

        void loadResumeSize();
    }, []);

    const infoRows = useMemo(
        () => [
            { label: "Name", value: RESUME_FILENAME },
            { label: "Kind", value: "PDF Document" },
            { label: "Size", value: resumeSize },
            { label: "Created", value: "2025" },
            { label: "Owner", value: "Shivam Biswal" }
        ],
        [resumeSize]
    );

    const handleOpenResume = () => {
        openResumePdf();
        setContextMenu(null);
    };

    const handleDownloadResume = () => {
        downloadResumePdf();
        setContextMenu(null);
    };

    return (
        <>
            <div className="absolute top-[48px] right-[16px] z-[20] flex flex-col gap-6 p-4">
                {icons.map((item) => {
                    const isSelected = selectedIcon === item.name;

                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={item.name}
                            className="group flex w-[84px] cursor-default flex-col items-center gap-1"
                            onClick={(event) => {
                                event.stopPropagation();
                                setSelectedIcon(item.name);
                                setContextMenu(null);
                            }}
                            onDoubleClick={(event) => {
                                event.stopPropagation();
                                if (item.kind === "resume") {
                                    handleOpenResume();
                                }
                            }}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setSelectedIcon(item.name);
                                if (item.kind === "resume") {
                                    setContextMenu({ x: event.clientX, y: event.clientY });
                                } else {
                                    setContextMenu(null);
                                }
                            }}
                        >
                            <div
                                className={`flex h-[64px] w-[64px] items-center justify-center rounded-xl border shadow-md transition-all ${
                                    isSelected
                                        ? "border-[#6cb6ff] bg-[#0a84ff]/25 ring-2 ring-[#0a84ff]/70 ring-offset-2 ring-offset-transparent shadow-[#0a84ff]/40"
                                        : "border-white/5 bg-black/20 group-hover:bg-black/40 group-hover:border-white/10"
                                }`}
                            >
                                {item.icon}
                            </div>
                            <span
                                className={`rounded-[4px] px-1 text-center text-[12px] leading-tight transition-colors ${
                                    isSelected ? "bg-[#0a84ff] text-white" : "text-[rgba(255,255,255,0.9)] group-hover:bg-[#0058d0]/60 group-hover:text-white"
                                }`}
                                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                            >
                                {item.name}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed z-[9998] min-w-[180px] rounded-[14px] border border-white/10 bg-[rgba(34,34,38,0.85)] p-1.5 text-white shadow-[0_24px_48px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                        style={{ left: contextMenu.x, top: contextMenu.y, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button type="button" onClick={handleOpenResume} className="w-full rounded-[10px] px-3 py-2 text-left text-[13px] hover:bg-[#0a84ff] active:opacity-80 transition-colors">
                            Open
                        </button>
                        <button type="button" onClick={handleDownloadResume} className="w-full rounded-[10px] px-3 py-2 text-left text-[13px] hover:bg-[#0a84ff] active:opacity-80 transition-colors">
                            Download
                        </button>
                        <button type="button" onClick={() => { setShowInspector(true); setContextMenu(null); }} className="w-full rounded-[10px] px-3 py-2 text-left text-[13px] hover:bg-[#0a84ff] active:opacity-80 transition-colors border-t border-white/5 mt-1 pt-2">
                            Get Info ⌘I
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showInspector && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/40 backdrop-blur-[4px]"
                        onClick={() => setShowInspector(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            className="w-[340px] rounded-[24px] border border-white/15 bg-[rgba(32,32,36,0.92)] p-6 text-white shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                            onClick={(event) => event.stopPropagation()}
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                        >
                            <div className="mb-5 flex items-center gap-4">
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a84ff]/20 text-white shadow-inner"
                                >
                                    <IoDocumentText size={34} />
                                </motion.div>
                                <div>
                                    <div className="text-[17px] font-bold tracking-tight">Resume Info</div>
                                    <div className="text-[12px] text-white/50 font-medium">PDF Document • {resumeSize}</div>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                {infoRows.map((row, idx) => (
                                    <motion.div
                                        key={row.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 + 0.1 }}
                                        className="flex items-start justify-between gap-4 rounded-[14px] bg-white/5 px-4 py-2.5 hover:bg-white/[0.08] transition-colors"
                                    >
                                        <span className="text-[12px] text-white/45 font-medium uppercase tracking-wider">{row.label}</span>
                                        <span className="text-right text-[13px] text-white/95 font-semibold">{row.value}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#0a84ff" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowInspector(false)}
                                className="mt-6 w-full py-3 rounded-[14px] bg-[#0a84ff]/90 text-white font-bold text-[14px] shadow-lg shadow-[#0a84ff]/30"
                            >
                                Done
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
