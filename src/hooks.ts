/**
 * © 2026 Mohammad Fazil Firojkhan Malek. All rights reserved.
 * Watermark-ID: MF-FIROJKHAN-MALEK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Mohammad Fazil Firojkhan Malek
 */

import { useEffect, useRef, useState, useCallback } from "react";

/* ===== Scroll reveal observer ===== */
export function useReveal() {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger-children";
    const els = document.querySelectorAll(selectors);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===== Scroll progress ===== */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ===== Typewriter effect ===== */
export function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, charIdx + 1));
          if (charIdx + 1 === word.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx(charIdx + 1);
          }
        } else {
          setText(word.slice(0, charIdx));
          if (charIdx === 0) {
            setDeleting(false);
            setWordIdx((wordIdx + 1) % words.length);
          } else {
            setCharIdx(charIdx - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ===== Counter animation ===== */
export function useCountUp(end: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!trigger || started) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [trigger, started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

/* ===== Mouse position ===== */
export function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

/* ===== Parallax on scroll ===== */
export function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewH / 2;
      setOffset(center * factor);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);

  return { ref, offset };
}

/* ===== Magnetic element ===== */
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0,0)`;
  }, []);

  return { ref, onMove, onLeave };
}
