/*
  Tiny sound-effect engine. Every sound is synthesised live with the Web Audio
  API, so there are no audio files to load. Browsers only allow sound after the
  visitor has tapped or pressed a key once; until then these calls do nothing.
*/
let ctx = null;
let enabled = true;
try { enabled = localStorage.getItem("nlp-sfx") !== "off"; } catch { /* storage blocked */ }

function audio() {
  if (!enabled) return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx.state === "running" ? ctx : null;
}

export const sfxEnabled = () => enabled;
export function setSfx(on) {
  enabled = on;
  try { localStorage.setItem("nlp-sfx", on ? "on" : "off"); } catch { /* ignore */ }
  if (on) tick();
}
/* call from the first tap / key so later (scroll-triggered) sounds are allowed */
export function unlockSfx() { if (enabled) audio(); }

function tone(freq, start, dur, { type = "sine", gain = 0.12, glideTo } = {}) {
  const c = audio(); if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}

function noise(start, dur, { from = 400, to = 2400, gain = 0.07 } = {}) {
  const c = audio(); if (!c) return;
  const t = c.currentTime + start;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(); src.buffer = buf;
  const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 0.8;
  f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(c.destination); src.start(t);
}

/* soft page turn: when you scroll into a new chapter */
export function pageTurn() { noise(0, 0.5, { from: 500, to: 3200, gain: 0.07 }); tone(520, 0.28, 0.35, { gain: 0.03, glideTo: 780 }); }
/* tiny chime for sparkles / taps */
export function tick() { tone(1318, 0, 0.18, { gain: 0.05, type: "triangle" }); }
/* collecting a star: a rising little arpeggio */
export function starChime(n = 0) {
  const base = [659, 784, 988, 1319][n % 4];
  [0, 0.09, 0.18].forEach((d, i) => tone(base * [1, 1.25, 1.5][i], d, 0.45, { gain: 0.09, type: "triangle" }));
  tone(base * 3, 0.27, 0.6, { gain: 0.03 });
}
/* putting a star back */
export function starDrop() { tone(660, 0, 0.25, { gain: 0.06, glideTo: 330, type: "triangle" }); }
/* envelope opening */
export function envelopeOpen() { noise(0, 0.35, { from: 800, to: 1800, gain: 0.05 }); [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25 + i * 0.12, 0.8, { gain: 0.06, type: "sine" })); }
/* blackboard lesson tapped */
export function chalk() { noise(0, 0.12, { from: 2500, to: 5000, gain: 0.05 }); }
