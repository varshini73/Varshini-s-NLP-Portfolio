import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink, Github, Headphones, Mic, Sparkles as SparkIcon, Volume2, VolumeX } from "lucide-react";
import { chapters, lessons, projects, letter, letterChapter } from "./data/story.js";
import ChapterScene from "./components/ChapterScene.jsx";
import ProgressRail from "./components/ProgressRail.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import Sparkles from "./components/Sparkles.jsx";
import { asset, isStudio } from "./utils.js";
import { chalk, envelopeOpen, setSfx, sfxEnabled, unlockSfx } from "./sfx.js";

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.7, ease: "easeOut" } };

function Header() {
  const [on, setOn] = useState(sfxEnabled());
  return (
    <header className="topbar">
      <a href="#top" className="wordmark"><span>✦</span> NLP Academy <small>Chronicles</small></a>
      <nav>
        <a href="#story">The story</a><a href="#lessons">Lessons</a><a href="#projects">Projects</a><a href="#letter">The letter</a>
      </nav>
      <div className="top-right">
        <button className="sfx-btn" onClick={() => { setSfx(!on); setOn(!on); }} aria-pressed={on} aria-label={on ? "Turn sound effects off" : "Turn sound effects on"} title={on ? "Sound effects on" : "Sound effects off"}>
          {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <a className="top-cta" href="#story">Start reading <ArrowRight size={14} /></a>
      </div>
    </header>
  );
}

/* The painted homepage is the hero. The "Enter the Storybook" button painted
   on the chalkboard is a real, clickable link; on phones the same link sits below. */
function Hero() {
  return (
    <section className="hero" id="top">
      <h1 className="sr-only">The NLP Academy Chronicles — one classroom, a thousand little memories.</h1>
      <img src={asset("images/homepage-anime.jpg")} className="hero-art" alt="Sharmila Banu Ma’am standing on the left and Varshini sitting on the right in their NLP classroom, in front of the chalkboard title" />
      <a href="#story" className="hero-hotspot" aria-label="Enter the Storybook"><span /></a>
      <div className="hero-mobile">
        <p>One classroom. A thousand little memories.</p>
        <a href="#story" className="btn">Enter the storybook <ArrowDown size={16} /></a>
      </div>
      <a href="#story" className="hero-scroll">Scroll to begin <ArrowDown size={13} /></a>
    </section>
  );
}

function Intro({ cards, onListen }) {
  return (
    <section id="story" className="intro">
      <motion.div {...fade} className="intro-head">
        <span className="eyebrow">The classroom diary</span>
        <h2>Every semester leaves <em>a story behind.</em></h2>
        <p>The first day, the unexpected turns, the lessons on the blackboard, the projects that made me think differently — and a letter at the end. Scroll slowly; it is one story.</p>
        <button className="btn listen" onClick={onListen}><Headphones size={18} /> Listen to the whole story</button>
        <small className="hint">Narrated chapter by chapter · sound effects can be switched off at the top</small>
      </motion.div>
      <div className="intro-cards">
        {cards.map((c, i) => (
          <motion.a key={c.id} href={`#${c.slug}`} className={`intro-card tone-${c.tone}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}>
            <b>{c.id}</b><span>{c.title}</span><i>{c.kicker}</i>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Lessons({ next }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="lessons" className="lessons">
      <motion.div {...fade} className="section-head">
        <span className="eyebrow">Chapter 05, on the board</span>
        <h2>Things we learned <em>along the way.</em></h2>
        <p>Tap a lesson to see it work. This is a starter list — we’ll align it with the exact course notes before publishing.</p>
      </motion.div>
      <motion.div {...fade} className="board">
        <div className="board-top"><span>NLP CLASS · BLACKBOARD NOTES</span><span className="chalk">✎</span></div>
        <div className="lesson-grid">
          {lessons.map(([title, desc, example], i) => (
            <button key={title} className={`lesson ${open === i ? "open" : ""}`} onClick={() => { chalk(); setOpen(open === i ? -1 : i); }} aria-expanded={open === i}>
              <span className="n">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <AnimatePresence initial={false}>
                {open === i && <motion.code initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{example}</motion.code>}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </motion.div>
      {next && <a className="next-link" href={next.href}><span>Next · {next.label}</span><ArrowRight size={15} /></a>}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <motion.div {...fade} className="section-head center">
        <span className="eyebrow">Project exhibition</span>
        <h2>Ideas from our <em>NLP classroom.</em></h2>
        <p>Two projects with different questions, different contexts, and a shared curiosity about language and information.</p>
      </motion.div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <motion.article key={p.title} className={`project p${i}`} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}>
            <div className="project-top"><span>Project 0{i + 1}</span><span className="glyph">{i === 0 ? "❧" : "⌖"}</span></div>
            <small>{p.kind}</small>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ol className="pipeline">{p.stages.map((s) => <li key={s}>{s}</li>)}</ol>
            <div className="project-detail">{p.details}</div>
          </motion.article>
        ))}
      </div>
      <a className="text-link center" href="https://github.com/varshini73/nlp" target="_blank" rel="noreferrer"><Github size={17} /> NLP hands-on notebooks on GitHub <ExternalLink size={14} /></a>
    </section>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  const written = letter.paragraphs.length > 0;
  return (
    <section id="letter" className="letter">
      <div className="letter-stars" aria-hidden="true" />
      <div className="letter-grid">
        <motion.div {...fade} className="letter-copy">
          <span className="eyebrow light">08 · The last page</span>
          <h2>{letterChapter.title}</h2>
          <p className="subtitle">Some lessons stay long after class ends.</p>
          <button className="btn" onClick={() => { if (!open) envelopeOpen(); setOpen(!open); }} aria-expanded={open}>{open ? "Fold the letter" : "Open the envelope"}</button>
          <AudioPlayer slug="letter" title="Hear the letter in my own voice" tone="dark" />
          <a className="back-top" href="#top">Back to the beginning ↑</a>
        </motion.div>
        <div className="envelope-wrap">
          <button className={`envelope ${open ? "open" : ""}`} onClick={() => { if (!open) envelopeOpen(); setOpen(!open); }} aria-label={open ? "Fold the letter" : "Open the envelope"}>
            <span className="flap" /><span className="pocket"><b>For Ma’am</b></span>
          </button>
          <div className={`sheet ${open ? "open" : ""}`} aria-hidden={!open}>
            <div className="sheet-clip">
              <div className="sheet-paper">
                <i>{letter.salutation}</i>
                {written ? letter.paragraphs.map((t, k) => <p key={k}>{t}</p>) : <p className="muted">Your letter will appear here once it is written. Put the words in <code>src/data/story.js</code>.</p>}
                <em>{letter.signoff}<br />{letter.name}</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });
  const studio = isStudio();

  const continuous = useRef(false);

  useEffect(() => { document.title = "The NLP Academy Chronicles"; }, []);

  // browsers allow sound only after a first tap or key press
  useEffect(() => {
    const unlock = () => unlockSfx();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => { window.removeEventListener("pointerdown", unlock); window.removeEventListener("keydown", unlock); };
  }, []);

  // "Listen to the whole story": when a chapter ends, glide to the next and play it
  useEffect(() => {
    const onEnded = (e) => {
      if (!continuous.current) return;
      const at = chapters.findIndex((c) => c.slug === e.detail);
      const next = chapters[at + 1];
      if (!next) { continuous.current = false; return; }
      document.getElementById(next.slug)?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("play-chapter", { detail: next.slug }));
    };
    window.addEventListener("chapter-ended", onEnded);
    return () => window.removeEventListener("chapter-ended", onEnded);
  }, []);

  const listenAll = () => {
    continuous.current = true;
    document.getElementById(chapters[0].slug)?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("play-chapter", { detail: chapters[0].slug }));
  };

  const cards = [...chapters, { ...letterChapter, tone: "peach" }];
  // reading order of every stop on the page
  const stops = [
    { id: "top", label: "Home" }, { id: "story", label: "Introduction" },
    ...chapters.slice(0, 5).map((c) => ({ id: c.slug, label: c.title })),
    { id: "lessons", label: "The blackboard" },
    ...chapters.slice(5).map((c) => ({ id: c.slug, label: c.title })),
    { id: "projects", label: "Project exhibition" }, { id: "letter", label: letterChapter.title },
  ];
  const nextOf = (id) => {
    const at = stops.findIndex((s) => s.id === id);
    const n = stops[at + 1];
    return n && { href: `#${n.id}`, label: n.label };
  };

  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX }} />
      <Header />
      <ProgressRail stops={stops} />
      <Sparkles />
      {studio && <div className="studio-banner"><Mic size={14} /> Studio mode — record under each chapter, then save the file into <code>public/audio/</code></div>}
      <main>
        <Hero />
        <Intro cards={cards} onListen={listenAll} />
        {chapters.map((c, i) => (
          <div key={c.slug} className="stack">
            <ChapterScene chapter={c} index={i} next={c.slug === "classroom-lessons" ? { href: "#lessons", label: "The blackboard" } : nextOf(c.slug)} />
            {c.slug === "classroom-lessons" && <Lessons next={nextOf("lessons")} />}
          </div>
        ))}
        <Projects />
        <Letter />
      </main>
      <footer className="footer">
        <span><SparkIcon size={12} /> The NLP Academy Chronicles</span>
        <span>Made of classroom memories, curiosity &amp; gratitude.</span>
        <a href="#top">Return to top ↑</a>
      </footer>
    </>
  );
}
