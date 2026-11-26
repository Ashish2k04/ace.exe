import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import StarField from "../StarField";
import { SmoothCursor } from "./smooth-cursor";

export const NotFoundPage: React.FC = () => {
  const [pulse, setPulse] = useState(70);

  useEffect(() => {
    let frameId = 0;
    let startTime: number | null = null;
    const duration = 3000;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      // Gentle oscillation between 40% and 90% fill from center
      const wave = (Math.sin((elapsed / duration) * Math.PI * 2) + 1) / 2;
      const currentFill = 40 + wave * 50;
      setPulse(currentFill);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const fillStart = 50 - pulse / 2;
  const fillEnd = 50 + pulse / 2;

  const textFillStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(
      to right,
      transparent 0%,
      transparent ${fillStart}%,
      white ${fillStart}%,
      white ${fillEnd}%,
      transparent ${fillEnd}%,
      transparent 100%
    )`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextStroke: "1.5px white",
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center antialiased selection:bg-white selection:text-black select-none overflow-hidden px-4 font-mono">
      <SmoothCursor />

      {/* Global StarField in background */}
      <StarField theme="dark" />

      {/* 404 Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6 max-w-md mx-auto">
        {/* Stroke / Fill Styled 404 Heading matching SpaceLoader */}
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-bold uppercase tracking-widest select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          style={textFillStyle}
        >
          404
        </h1>

        {/* Subtitle */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">
            Lost In Space // Page Not Found
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            The cosmic coordinates you requested do not exist or have drifted into the deep void.
          </p>
        </div>

        {/* Action Button: Back to Home */}
        <div className="pt-2">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 hover:border-white bg-transparent text-xs uppercase tracking-widest font-semibold overflow-hidden transition-colors duration-500 ease-out cursor-pointer active:scale-95"
          >
            {/* Rising water fill layer */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 pointer-events-none"
            />
            {/* Button text & icon */}
            <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-500 ease-out group-hover:text-black">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
