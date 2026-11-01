import { useEffect, useRef, useState } from "react";
import { pageTurn } from "../sfx.js";

/* Right-hand rail. `stops` = [{ id, label }] in reading order. */
export default function ProgressRail({ stops }) {
  const [active, setActive] = useState(stops[0].id);
  const first = useRef(true);

  useEffect(() => { if (first.current) { first.current = false; return; } pageTurn(); }, [active]);

  useEffect(() => {
    const nodes = stops.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [stops]);

  return (
    <nav className="rail" aria-label="Story progress">
      {stops.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={s.id === active ? "on" : ""} aria-label={s.label} aria-current={s.id === active}>
          <i /><span>{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
