/**
 * © 2026 Darshan Girase. All rights reserved.
 * Watermark-ID: DG-1812-2026
 * This codebase is protected under intellectual property laws.
 * Author: Darshan Girase
 */

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Small hand doodles reused inside the pages */
const Wavy = ({ color = "#e63946", className = "" }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 300 12" className={className} fill="none" preserveAspectRatio="none">
    <path d="M2 7 Q 40 2, 80 7 T 160 6 T 240 8 T 298 5" stroke={color} strokeWidth={3} strokeLinecap="round" />
  </svg>
);
const Star = ({ className = "", color = "#f4a261" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill={color} stroke="#1a1a1a" strokeWidth={1.5}>
    <path d="M25 2 L 31 18 L 48 19 L 35 30 L 39 47 L 25 38 L 11 47 L 15 30 L 2 19 L 19 18 Z" />
  </svg>
);
const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12 C 16 38, 26 50, 50 48" /><path d="M40 42 L 50 48 L 42 55" />
  </svg>
);

export default function Notebook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const root = rootRef.current;

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        runCinematic: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const conditions = context.conditions || {};
        const reduceMotion = !!conditions.reduceMotion;

        if (reduceMotion) {
          root?.classList.add("nb-fallback");
        } else {
          root?.classList.remove("nb-fallback");

          const camera = cameraRef.current!;
          const cover = coverRef.current!;
          const shadow = shadowRef.current!;
          const band = bandRef.current!;
          const cue = cueRef.current!;

          const rightItems = gsap.utils.toArray<HTMLElement>(".nb-page-right .nb-item");
          const leftItems = gsap.utils.toArray<HTMLElement>(".nb-page-left .nb-item");

          /* ---- initial states ---- */
          gsap.set(cover, { rotationY: 0, z: 2, autoAlpha: 1, transformOrigin: "left center" });
          gsap.set(camera, { scale: 0.82, xPercent: 0, yPercent: 0, rotationX: 9 });
          gsap.set(band, { autoAlpha: 1, z: 3 });
          gsap.set([...rightItems, ...leftItems], { autoAlpha: 0, y: 26, rotation: -1 });

          const isMobileViewport = window.matchMedia("(max-width: 820px)").matches;
          const RIGHT_TOP = 18;     // camera yPercent when at top of a page
          const RIGHT_BOTTOM = -20; // camera yPercent when at bottom of a page
          const FOCUS_SCALE = isMobileViewport ? 2.0 : 1.42; // zoom level while reading (looser → page edges visible)
          const SHIFT = isMobileViewport ? 32 : 22;         // horizontal shift to center a single page

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=6500",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          });

          /* ===== 1 & 2. Closed book → band off → cover opens fully ===== */
          tl.to(band, { autoAlpha: 0, x: 40, duration: 0.3 }, 0);
          tl.to(cue, { autoAlpha: 0, duration: 0.3 }, 0.15);
          // cover swings the full way open (flat onto the left side)
          tl.to(cover, { rotationY: -180, duration: 1.5, ease: "power3.inOut" }, 0.2);
          // book flattens toward camera
          tl.to(camera, { rotationX: 0, scale: 0.92, duration: 1.5, ease: "power3.inOut" }, 0.2);
          tl.to(shadow, { opacity: 0.9, scaleX: 1.15, duration: 1.5 }, 0.2);
          // once fully open, fade the cover out entirely so it can NEVER overlap text
          tl.to(cover, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, ">-0.15");

          /* ===== 3. Zoom into TOP of RIGHT page ===== */
          tl.to(
            camera,
            { scale: FOCUS_SCALE, xPercent: -SHIFT, yPercent: RIGHT_TOP, rotationX: 0, duration: 1.4, ease: "power2.inOut" },
            ">-0.1"
          );

          /* ===== 4. Read DOWN the right page ===== */
          tl.addLabel("right");
          const rightTravel = rightItems.length * 0.55 + 0.6;
          // items reveal as the camera passes them
          rightItems.forEach((el, i) => {
            tl.to(el, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.5, ease: "power2.out" }, `right+=${i * 0.55 + 0.15}`);
          });
          tl.fromTo(
            camera,
            { yPercent: RIGHT_TOP },
            { yPercent: RIGHT_BOTTOM, duration: rightTravel, ease: "none" },
            "right"
          );
          tl.addLabel("rightDone");

          /* ===== 5. Pan across the spine to TOP of LEFT page ===== */
          tl.to(
            camera,
            { xPercent: SHIFT, yPercent: RIGHT_TOP, duration: 1.4, ease: "power2.inOut" },
            "rightDone+=0.1"
          );
          tl.addLabel("leftTop");

          /* ===== 6. Read DOWN the left page ===== */
          tl.addLabel("left", "leftTop+=0.05");
          const leftTravel = leftItems.length * 0.55 + 0.6;
          leftItems.forEach((el, i) => {
            tl.to(el, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.5, ease: "power2.out" }, `left+=${i * 0.55 + 0.15}`);
          });
          tl.fromTo(
            camera,
            { yPercent: RIGHT_TOP },
            { yPercent: RIGHT_BOTTOM, duration: leftTravel, ease: "none" },
            "left"
          );
          tl.addLabel("leftDone");

          /* ===== 7. Zoom back OUT to reveal the full open spread ===== */
          tl.to(
            camera,
            { scale: 0.92, xPercent: 0, yPercent: 0, rotationX: 3, duration: 1.5, ease: "power3.inOut" },
            "leftDone+=0.15"
          );
          // small hold so the full notebook is appreciated
          tl.to({}, { duration: 0.4 });

          /* ===== 8. Notebook gently rises & fades away ===== */
          tl.to(
            camera,
            { yPercent: -16, scale: 0.8, autoAlpha: 0, rotationX: 10, duration: 1.1, ease: "power2.in" },
            ">"
          );
          tl.to(shadow, { opacity: 0, duration: 0.9 }, "<");
        }
      }
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    // refresh after fonts load (layout shift safety)
    const fontTimer = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fontTimer);
      mm.revert();
    };
  }, []);

  return (
    <section id="notebook" ref={rootRef} className="relative">
      <div className="nb-pin">
        {/* Scroll cue */}
        <div className="nb-cue" ref={cueRef}>
          <p className="font-[Patrick_Hand] text-[#6a4a25] text-lg">keep scrolling to open the notebook</p>
          <div className="mt-1 mx-auto w-6 text-[#6a4a25] bounce-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 4 L12 20 M5 13 L12 20 L19 13" /></svg>
          </div>
        </div>

        {/* Mobile-only heading (shown when fallback is active) */}
        <div className="nb-mobile-head text-center mb-6">
          <p className="font-[Gochi_Hand] text-[#e63946] text-base">// from my notebook</p>
          <h2 className="font-[Caveat] font-bold text-4xl leading-none text-[#3a2d1a]">The Notebook 📓</h2>
          <p className="font-[Architects_Daughter] text-[#6a4a25] text-sm mt-1">stories, sketches & scribbles</p>
        </div>

        {/* CAMERA (this moves) */}
        <div className="nb-camera-wrap">
          <div className="nb-camera" ref={cameraRef}>
            <div className="nb-book" ref={bookRef}>
              <div className="nb-shadow" ref={shadowRef} />
              <div className="nb-backcover" />

            {/* The open spread (left + right pages) */}
            <div className="nb-spread">
              {/* LEFT PAGE */}
              <div className="nb-page nb-page-left">
                <div className="nb-page-content flex flex-col">
                  <div className="nb-item">
                    <p className="font-[Gochi_Hand] text-[#e63946] nb-label">// chapter two</p>
                    <h3 className="font-[Caveat] font-bold nb-h leading-none relative inline-block">
                      how i work
                      <Wavy className="absolute left-0 right-0 -bottom-1 h-2" color="#1a1a1a" />
                    </h3>
                  </div>

                  <div className="nb-item font-[Kalam] text-[#2a2118] nb-body">
                    my process: prototype fast, evaluate ruthlessly, deploy confidently.
                    i sketch the agent architecture first, then build the
                    <span className="hl-yellow"> ugly version</span> — because a working pipeline
                    teaches more than a perfect slide deck.
                  </div>

                  <div className="nb-item nb-sketch">
                    <p className="font-[Permanent_Marker] text-[#1a1a1a] nb-mark mb-2">my build loop ↻</p>
                    <div className="flex flex-wrap gap-2 items-center font-[Patrick_Hand] nb-chip text-[#2a2118]">
                      <span className="px-2 py-0.5 bg-white/70 border border-black/30 rounded">prompt</span>→
                      <span className="px-2 py-0.5 bg-white/70 border border-black/30 rounded">prototype</span>→
                      <span className="px-2 py-0.5 bg-white/70 border border-black/30 rounded">evaluate</span>→
                      <span className="px-2 py-0.5 bg-white/70 border border-black/30 rounded">deploy</span>
                    </div>
                  </div>

                  <div className="nb-item font-[Kalam] text-[#2a2118] nb-body">
                    i keep notes on every agent failure mode, eval metric, and
                    "why did this hallucinate at 2am" bug. <span className="hl-pink">this is one of those pages.</span>
                  </div>

                  <div className="nb-item flex items-center gap-3">
                    <Star className="w-[7cqw] max-w-9 min-w-6 shrink-0" color="#ffd93d" />
                    <p className="font-[Shadows_Into_Light] text-[#3a2d1a] nb-quote">
                      "if you can't trace it, you can't trust it."
                    </p>
                  </div>
                </div>
              </div>

              {/* SPINE */}
              <div className="nb-spine" />

              {/* RIGHT PAGE */}
              <div className="nb-page nb-page-right">
                <div className="nb-page-content flex flex-col">
                  <div className="nb-item">
                    <p className="font-[Gochi_Hand] text-[#e63946] nb-label">// chapter one</p>
                    <h3 className="font-[Caveat] font-bold nb-h leading-none relative inline-block">
                      my story
                      <Wavy className="absolute left-0 right-0 -bottom-1 h-2" color="#e63946" />
                    </h3>
                  </div>

                  <div className="nb-item font-[Kalam] text-[#2a2118] nb-body">
                    it started with curiosity about <b>"how do machines actually learn?"</b>
                    so i picked up Python, then dove into ML, LLMs, and everything in between — one project at a time.
                  </div>

                  <div className="nb-item flex items-start gap-3">
                    <div className="nb-photo shrink-0" style={{ transform: "rotate(-3deg)" }}>
                      <div className="w-[20cqw] max-w-20 aspect-[5/6] bg-gradient-to-br from-[#7b1e26] to-[#a12d38] rounded-sm flex items-center justify-center text-[6cqw] md:text-3xl">🧑‍💻</div>
                      <p className="font-[Shadows_Into_Light] text-[#555] nb-chip text-center pt-1">day one</p>
                    </div>
                    <p className="font-[Kalam] text-[#2a2118] nb-body">
                      B.Tech in AI & Data Science at VIIT Pune. no shortcuts —
                      <span className="hl-blue"> late nights</span> debugging agents and grinding LeetCode.
                    </p>
                  </div>

                  <div className="nb-item">
                    <p className="font-[Permanent_Marker] text-[#1a1a1a] nb-mark mb-1">then came the real work 🚀</p>
                    <p className="font-[Kalam] text-[#2a2118] nb-body">
                      CrewAI intern at CrowdWisdomTrading, IEEE paper at ICCUBEA, PyPI-published SDK —
                      built to <span className="hl-green">ship to production, not just notebooks.</span>
                    </p>
                  </div>

                  <div className="nb-item relative">
                    <p className="font-[Shadows_Into_Light] text-[#3a2d1a] nb-quote">
                      today: 300+ LeetCode problems, Knight badge, 4 shipped projects, and still just getting started.
                    </p>
                    <Arrow className="w-[12cqw] max-w-12 text-[#6a4a25] absolute -right-1 -bottom-7 rotate-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* FRONT COVER that opens (fades out once open) */}
            <div className="nb-band" ref={bandRef} />
            <div className="nb-cover" ref={coverRef}>
              <div className="nb-cover-front">
                <div className="nb-cover-band" style={{ top: "14%" }} />
                <div className="nb-cover-band" style={{ bottom: "14%" }} />
                <div className="nb-cover-face">
                  <div className="w-14 h-14 rounded-full border-2 border-[#ffdcb4]/60 flex items-center justify-center font-[Permanent_Marker] text-2xl text-[#ffe8d0]">D</div>
                  <h3 className="font-[Caveat] font-bold text-4xl md:text-5xl text-[#ffe8d0] leading-none">The Notebook</h3>
                  <p className="font-[Patrick_Hand] text-[#ffdcb4]/80 text-base">stories, sketches & scribbles</p>
                  <p className="font-[Shadows_Into_Light] text-[#ffdcb4]/60 text-sm mt-2">— Darshan Girase</p>
                </div>
              </div>
              <div className="nb-cover-back" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
