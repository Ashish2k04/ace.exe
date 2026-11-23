
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import StarField from "../StarField";

function Airplane() {
  return (
    <svg
      className="w-[60px] sm:w-[76px] h-auto"
      viewBox="0 0 72 46"
      fill="none"
    >
      <defs>
        <linearGradient id="plane-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a8b8ca" />
        </linearGradient>
      </defs>

      <path d="M44 21 L28 21 L8 2 L18 0 Z" fill="#b9d9ff" />
      <path d="M44 25 L28 25 L8 44 L18 46 Z" fill="#779ac5" />
      <path d="M8 21 L2 14 L6 14 L12 21 Z" fill="#a8c8ef" />
      <path d="M8 25 L2 32 L6 32 L12 25 Z" fill="#a8c8ef" />

      <ellipse cx="34" cy="23" rx="29" ry="7" fill="url(#plane-body)" />

      <path
        d="M61 19.5 C66 21.5 67.5 23 67 23 C67.5 23 66 24.5 61 26.5 L58 23 Z"
        fill="#ffffff"
      />

      <ellipse cx="57" cy="23" rx="4" ry="3" fill="#55c9ff" />
    </svg>
  );
}

export default function SpaceLoader() {
  const [progress, setProgress] = useState(0);
  const [takingOff, setTakingOff] = useState(false);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const duration = 4000;

    const animate = (time: number) => {
      if (startTime.current === null) {
        startTime.current = time;
      }

      const elapsed = time - startTime.current;
      const value = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.round(value));

      if (value < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        setTakingOff(true);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030712] text-white">

      {/* Existing StarField */}
      <StarField theme="dark" />

      {/* Ambient fire glow */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-orange-600/10 blur-[110px]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-8 px-6">

        {/* Runway */}
        <div className="relative h-14 w-full overflow-visible rounded-full border border-white/10 bg-slate-800 shadow-[0_0_35px_rgba(249,115,22,0.15)]">

          {/* Fire progress */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-950 via-red-600 to-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.65)]"
            style={{ width: `${progress}%` }}
          />

          {/* Airplane */}
          <motion.div
            className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${Math.min(progress, 90)}%` }}
            animate={
              takingOff
                ? {
                    x: 130,
                    y: -150,
                    rotate: -20,
                    scale: 1.5,
                    opacity: 0,
                  }
                : {}
            }
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            <Airplane />
          </motion.div>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-bold tabular-nums">
            {progress}%
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
            Preparing for launch
          </p>
        </div>

      </div>
    </div>
  );
}
