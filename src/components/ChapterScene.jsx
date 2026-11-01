import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Star } from "lucide-react";
import AudioPlayer from "./AudioPlayer.jsx";
import { asset } from "../utils.js";
import { starChime, starDrop } from "../sfx.js";

/* ── Interactive star counters ─────────────────────────────── */
function Stars({ total, label, caption }) {
  const [got, setGot] = useState(0);
  return (
    <div className="stars">
      <div className="stars-row">
        {Array.from({ length: total }, (_, i) => (
          <motion.button key={i} className={`star-btn ${i < got ? "got" : ""}`} whileTap={{ scale: 0.8, rotate: -15 }}
            onClick={() => { if (i < got) { starDrop(); setGot(i); } else { starChime(i); setGot(i + 1); } }} aria-label={`Star ${i + 1} of ${total}`} aria-pressed={i < got}>
            <Star size={total > 1 ? 30 : 46} fill="currentColor" />
          </motion.button>
        ))}
      </div>
      <b>{got === total ? caption : label}</b>
      <small>{got === total ? "Tap a star to put it back" : "Tap to collect"}</small>
    </div>
  );
}

/* ── The art panel for each chapter ────────────────────────── */
function Art({ chapter }) {
  const v = chapter.visual;
  if (v === "first-day")
    return <img className="art-photo" src={asset("images/varshini-seated-original-cartoon.webp")} alt="Cartoon illustration of Varshini seated in her blue floral kurta" />;
  if (v === "switch" || v === "star")
    return <>
      <img className="art-cameo" src={asset("images/cameo-mam.webp")} alt="Sharmila Banu Ma’am in her cream hijab and blue patterned set" />
      {v === "star" && <div className="art-corner"><Stars total={1} label="Varshini’s first star" caption="1 individual star ★" /></div>}
      {v === "switch" && <div className="art-chip chip-a">The class changes</div>}
      {v === "switch" && <div className="art-chip chip-b">…and Ma’am returns</div>}
    </>;
  if (v === "poetry")
    return <>
      <img className="art-cameo right" src={asset("images/cameo-varshini.webp")} alt="Varshini smiling in her blue floral kurta" />
      <div className="art-leaf"><small>CLASSICAL TAMIL POETRY</small><strong>அகம் · புறம்</strong><em>Tinai · Uri · Emotion</em></div>
    </>;
  if (v === "lessons")
    return <div className="art-board"><small>TODAY’S NLP LESSON</small><strong>Text → Meaning</strong><em>bigram · trigram · context</em></div>;
  if (v === "lab")
    return <div className="art-laptop"><div className="screen"><span>print("Hello, NLP!")</span><i /><i /><i /></div><div className="keys" /></div>;
  if (v === "health")
    return <>
      <div className="art-map">
        <span className="pin p1" /><span className="pin p2" /><span className="pin p3" /><span className="route" />
        <b>HEALTH MAP</b>
      </div>
      <div className="art-corner wide"><Stars total={4} label="Our team’s stars" caption="4 team stars ★★★★" /></div>
    </>;
  return null;
}

export default function ChapterScene({ chapter, index, next }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    <section id={chapter.slug} ref={ref} className={`chapter tone-${chapter.tone} ${index % 2 ? "flip" : ""}`}>
      <motion.span className="chapter-ghost" style={{ y: drift }} aria-hidden="true">{chapter.id}</motion.span>
      <div className="chapter-grid">
        <motion.div className="chapter-copy" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <span className="kicker"><b>{chapter.id}</b>{chapter.kicker}</span>
          <h2>{chapter.title}</h2>
          <p className="subtitle">{chapter.subtitle}</p>
          <div className="prose">{chapter.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="bubbles">
            {chapter.dialogue.map((d, i) => (
              <motion.div key={i} className={`bubble ${d.who === "Narrator" ? "narrator" : "speaker"}`}
                initial={{ opacity: 0, scale: 0.9, x: -12 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
                <small>{d.who}</small>“{d.line}”
              </motion.div>
            ))}
          </div>
          <AudioPlayer slug={chapter.slug} title="Hear this chapter" />
          {chapter.link && <a className="text-link" href={chapter.link} target="_blank" rel="noreferrer"><Code2 size={16} /> Explore the NLP practical notebooks</a>}
        </motion.div>

        <motion.div className="chapter-art" style={{ y: lift }} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className={`frame frame-${chapter.visual}`}><Art chapter={chapter} /></div>
          <span className="orbit o1" aria-hidden="true">{chapter.symbol}</span>
          <span className="orbit o2" aria-hidden="true">✦</span>
        </motion.div>
      </div>
      {next && <a className="next-link" href={next.href}><span>Next · {next.label}</span><ArrowRight size={15} /></a>}
    </section>
  );
}
