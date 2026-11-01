import { useEffect, useRef, useState } from "react";
import { Play, Pause, Mic } from "lucide-react";
import { asset, isStudio } from "../utils.js";
import StudioRecorder from "./StudioRecorder.jsx";

/*
  Plays YOUR recording. Drop a file named after the chapter into public/audio/
  (e.g. public/audio/first-day.mp3). The page finds it by itself — no code to edit.
  Accepted: .mp3  .m4a  .wav   ·   Add ?studio to the page URL to record in the browser.
*/
const EXTENSIONS = ["mp3", "m4a", "wav"];
const cache = new Map();
let nowPlaying = null; // only one voice at a time

async function findRecording(slug) {
  if (cache.has(slug)) return cache.get(slug);
  for (const ext of EXTENSIONS) {
    const url = asset(`audio/${slug}.${ext}`);
    try {
      const res = await fetch(url, { method: "HEAD" });
      const type = res.headers.get("content-type") || "";
      if (res.ok && (type.startsWith("audio") || type.includes("ogg"))) {
        cache.set(slug, url);
        return url;
      }
    } catch { /* offline or blocked: treat as missing */ }
  }
  cache.set(slug, null);
  return null;
}

const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export default function AudioPlayer({ slug, title = "Hear this chapter", tone = "light" }) {
  const [src, setSrc] = useState(undefined); // undefined = looking, null = none yet
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(0);
  const audioRef = useRef(null);
  const studio = isStudio();

  useEffect(() => {
    let alive = true;
    findRecording(slug).then((url) => alive && setSrc(url));
    return () => { alive = false; };
  }, [slug]);

  // lets the "listen to the whole story" mode start this chapter
  useEffect(() => {
    const onPlay = (e) => { if (e.detail === slug) setTimeout(() => { if (audioRef.current?.paused) toggle(); }, 600); };
    window.addEventListener("play-chapter", onPlay);
    return () => window.removeEventListener("play-chapter", onPlay);
  });

  useEffect(() => () => { if (nowPlaying === audioRef.current) nowPlaying = null; }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      if (nowPlaying && nowPlaying !== el) nowPlaying.pause();
      nowPlaying = el;
      el.play().catch(() => setPlaying(false));
    } else el.pause();
  }

  const seek = (e) => { if (audioRef.current) audioRef.current.currentTime = Number(e.target.value); };
  const ready = Boolean(src);

  return (
    <div className={`voice voice-${tone} ${ready ? "is-ready" : "is-empty"}`}>
      <div className="voice-row">
        <button className="voice-btn" onClick={toggle} disabled={!ready} aria-label={playing ? "Pause" : "Play"}>
          {ready ? (playing ? <Pause size={18} /> : <Play size={18} />) : <Mic size={17} />}
        </button>
        <div className="voice-meta">
          <b>{title}</b>
          {ready ? (
            <div className="voice-track">
              <input type="range" min="0" max={length || 1} step="0.1" value={time} onChange={seek} aria-label="Seek" style={{ "--p": `${length ? (time / length) * 100 : 0}%` }} />
              <small>{fmt(time)} / {fmt(length)}</small>
            </div>
          ) : (
            <small>{src === undefined ? "Looking for the recording…" : "Voice note coming soon"}</small>
          )}
        </div>
      </div>
      {ready && (
        <audio
          ref={audioRef} src={src} preload="metadata"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setTime(0); window.dispatchEvent(new CustomEvent("chapter-ended", { detail: slug })); }}
          onTimeUpdate={(e) => setTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setLength(e.target.duration)}
        />
      )}
      {studio && <StudioRecorder slug={slug} />}
    </div>
  );
}
