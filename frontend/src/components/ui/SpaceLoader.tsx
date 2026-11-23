
"use client";

import { useEffect, useState } from "react";
import StarField from "../StarField";

export default function SpaceLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let startTime: number | null = null;

    const duration = 5000;
    const maxProgress = 90;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const elapsed = time - startTime;
      const percentage = Math.min(elapsed / duration, 1);

      // Smooth progress, capped at 90% until the route loads.
      const eased = 1 - Math.pow(1 - percentage, 3);

      setProgress(Math.min(Math.round(eased * maxProgress), maxProgress));

      if (percentage < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const textFillStyle = {
    backgroundImage: `linear-gradient(to right, white ${progress}%, transparent ${progress}%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextStroke: "1px white",
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* Existing StarField */}
      <StarField theme="dark" />

      <div className="relative z-10 flex flex-col items-center gap-5">

        {/* Animated Loading Text */}
        <h1
          className="text-4xl font-bold uppercase tracking-wider sm:text-6xl"
          style={textFillStyle}
        >
          Loading
        </h1>

        {/* Percentage */}
        <p className="text-sm font-medium tracking-[0.3em] text-white tabular-nums">
          {progress}%
        </p>
        
      </div>
    </div>
  );
}
