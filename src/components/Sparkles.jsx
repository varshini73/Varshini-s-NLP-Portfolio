import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { tick } from "../sfx.js";

/* A tiny burst of stars wherever you tap. */
const GLYPHS = ["✦", "★", "✧", "♥"];
const COLORS = ["#ffc94d", "#ff7d9d", "#a98bff", "#4fd1b0"];
let uid = 0;

export default function Sparkles() {
  const [bursts, setBursts] = useState([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onTap = (e) => {
      if (e.target.closest?.("input, audio, .studio")) return;
      const id = ++uid;
      tick();
      const bits = Array.from({ length: 6 }, (_, i) => ({
        i, a: (Math.PI * 2 * i) / 6 + Math.random(), d: 28 + Math.random() * 26,
        g: GLYPHS[(i + id) % GLYPHS.length], c: COLORS[(i + id) % COLORS.length],
      }));
      setBursts((b) => [...b.slice(-4), { id, x: e.clientX, y: e.clientY, bits }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 800);
    };
    window.addEventListener("pointerdown", onTap);
    return () => window.removeEventListener("pointerdown", onTap);
  }, [reduce]);

  return (
    <div className="sparkle-layer" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((b) => b.bits.map((s) => (
          <motion.span key={`${b.id}-${s.i}`} className="sparkle" style={{ left: b.x, top: b.y, color: s.c }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
            animate={{ x: Math.cos(s.a) * s.d, y: Math.sin(s.a) * s.d, opacity: 0, scale: 1.1, rotate: 90 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>{s.g}</motion.span>
        )))}
      </AnimatePresence>
    </div>
  );
}
