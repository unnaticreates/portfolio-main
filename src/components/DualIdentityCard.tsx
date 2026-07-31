import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DualIdentityCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCanvasActive, setIsCanvasActive] = useState(true);

  // 3D Tilt Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Heavy Spring Configuration (stiffness: 120, damping: 25)
  const springConfig = { stiffness: 120, damping: 25 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-140, 140], [12, -12]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-220, 220], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent flip when clicking interactive elements like toggle switch or deploy button
    const target = e.target as HTMLElement;
    if (target.closest(".interactive-element")) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative flex items-center justify-center p-4 select-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative w-[440px] h-[280px] max-w-[95vw] scale-90 sm:scale-100 cursor-pointer"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Dynamic Localized Ambient Mesh Gradient Glow */}
        <div
          className={`absolute -inset-1 rounded-3xl blur-xl opacity-70 transition-all duration-700 pointer-events-none ${
            isFlipped
              ? "bg-gradient-to-r from-rose-500/30 via-pink-500/20 to-purple-600/30 shadow-[0_0_50px_-12px_rgba(244,63,94,0.35)]"
              : "bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-pink-500/30 shadow-[0_0_50px_-12px_rgba(168,85,247,0.35)]"
          }`}
        />

        {/* 3D Flipping Card Container */}
        <motion.div
          className="relative w-full h-full rounded-2xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ==================== CARD FRONT: PYTHON DEV TERMINAL ==================== */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-950/90 text-zinc-100"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              {/* Mac-Style Window Controls */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
              </div>

              {/* Header Badge */}
              <div className="bg-purple-950/40 border border-purple-500/20 text-purple-300 font-mono text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-inner">
                <span className="text-purple-400 animate-pulse">⚡</span>
                <span>core_engine.py</span>
              </div>
            </div>

            {/* Code Editor Body (VS Code Tokyo Night Theme) */}
            <div className="font-mono text-xs leading-relaxed my-auto py-1 px-1 space-y-1">
              <div className="text-zinc-500 italic text-[11px]"># Python Core Engine</div>
              
              <div className="flex items-center">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">1</span>
                <span className="text-pink-400 font-semibold">class</span>
                <span className="text-blue-400 font-medium ml-1.5">Unnati</span>
                <span className="text-zinc-300">:</span>
              </div>

              <div className="flex items-center pl-4">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">2</span>
                <span className="text-pink-400 font-semibold">def</span>
                <span className="text-blue-400 font-medium ml-1.5">__init__</span>
                <span className="text-zinc-300">(self):</span>
              </div>

              <div className="flex items-center pl-8">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">3</span>
                <span className="text-zinc-300">self.role =</span>
                <span className="text-emerald-400 ml-1.5">"Python Dev"</span>
              </div>

              <div className="flex items-center pl-8">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">4</span>
                <span className="text-zinc-300">self.skills = [</span>
                <span className="text-purple-300 font-medium">"FastAPI"</span>
                <span className="text-zinc-400">,</span>
                <span className="text-purple-300 font-medium ml-1">"AI"</span>
                <span className="text-zinc-400">,</span>
                <span className="text-purple-300 font-medium ml-1">"UI/UX"</span>
                <span className="text-zinc-300">]</span>
              </div>

              <div className="flex items-center pl-4">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">5</span>
                <span className="text-pink-400 font-semibold">def</span>
                <span className="text-blue-400 font-medium ml-1.5">build_magic</span>
                <span className="text-zinc-300">(self):</span>
              </div>

              <div className="flex items-center pl-8">
                <span className="text-zinc-600 w-4 text-right mr-3 select-none text-[11px]">6</span>
                <span className="text-pink-400 font-semibold">return</span>
                <span className="text-emerald-400 ml-1.5">"Code + Design"</span>
                <span className="text-purple-400 font-bold ml-1 animate-pulse">|</span>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center pt-2 border-t border-white/5">
              <span className="text-[10px] text-zinc-500 tracking-wider uppercase font-mono transition-colors hover:text-purple-400">
                [ Click to switch to Design Mode ]
              </span>
            </div>
          </div>

          {/* ==================== CARD BACK: UI/UX DESIGN CANVAS ==================== */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-rose-950/20 via-zinc-950/90 to-zinc-950/95 text-zinc-100"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              {/* Vector Layer Icon + Text */}
              <div className="flex items-center space-x-1.5 text-xs text-zinc-400 font-mono">
                <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Canvas &gt; Layer_1</span>
              </div>

              {/* Header Badge */}
              <div className="bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-inner">
                <span className="text-rose-400 animate-pulse">🎨</span>
                <span>production_ui</span>
              </div>
            </div>

            {/* Interactive Wireframe Mockup Canvas */}
            <div className="my-auto space-y-3 py-1">
              {/* Master Navigation Bar with Functional Toggle Switch */}
              <div className="flex items-center justify-between bg-zinc-900/60 border border-white/5 p-2 rounded-xl backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-semibold text-zinc-200">System Dashboard</span>
                </div>

                {/* Glowing Pink Toggle Switch Component */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCanvasActive(!isCanvasActive);
                  }}
                  className={`interactive-element relative w-9 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    isCanvasActive ? "bg-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.6)]" : "bg-zinc-800"
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-md"
                    animate={{ x: isCanvasActive ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* 2-Column Grid Layout */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Column 1: Metrics & Micro Bar Chart Block */}
                <div className="bg-zinc-900/40 border border-white/5 p-2.5 rounded-xl flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Fidelity Score</span>
                    <span className="text-rose-400 font-mono font-bold">99.8%</span>
                  </div>

                  {/* Micro Bar Chart */}
                  <div className="flex items-end justify-between gap-1.5 h-10 px-1 pt-1">
                    <div className="w-full bg-rose-500/40 rounded-t h-[40%] animate-pulse" />
                    <div className="w-full bg-pink-500/60 rounded-t h-[75%] animate-pulse" style={{ animationDelay: "150ms" }} />
                    <div className="w-full bg-purple-500/80 rounded-t h-[95%] animate-pulse" style={{ animationDelay: "300ms" }} />
                    <div className="w-full bg-rose-400 rounded-t h-[60%] animate-pulse" style={{ animationDelay: "450ms" }} />
                  </div>
                </div>

                {/* Column 2: Profile Component & Interactive Action */}
                <div className="bg-zinc-900/40 border border-white/5 p-2.5 rounded-xl flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-[9px] text-white font-bold shadow-md">
                      UP
                    </div>
                    <div className="space-y-1">
                      <div className="w-12 h-1.5 bg-zinc-300/80 rounded" />
                      <div className="w-8 h-1 bg-zinc-600 rounded" />
                    </div>
                  </div>

                  {/* Micro Interactive Hover Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("UI Component Deployed!");
                    }}
                    className="interactive-element w-full py-1 text-[10px] font-medium bg-gradient-to-r from-rose-500/30 to-purple-500/30 hover:from-rose-500/60 hover:to-purple-500/60 border border-rose-400/40 rounded-lg text-rose-200 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    Deploy UI
                  </button>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center pt-2 border-t border-white/5">
              <span className="text-[10px] text-zinc-500 tracking-wider uppercase font-mono transition-colors hover:text-rose-400">
                [ Click to switch to Engine Mode ]
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DualIdentityCard;
