import { useRef, useState } from "react";
import { Circle, Square, Download } from "lucide-react";

/*
  Recording studio — only appears when the page is opened with ?studio
  Record → listen → download. The file is saved as <chapter>.wav, ready to
  drop into public/audio/. (WAV plays in every browser, so nothing to convert.)
*/
const RATE = 22050; // mono, 16-bit: clear speech, about 2.6 MB per minute

function toWav(samples) {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const text = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  text(0, "RIFF"); v.setUint32(4, 36 + samples.length * 2, true); text(8, "WAVEfmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, RATE, true); v.setUint32(28, RATE * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  text(36, "data"); v.setUint32(40, samples.length * 2, true);
  samples.forEach((s, i) => v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, s)) * 0x7fff, true));
  return new Blob([buf], { type: "audio/wav" });
}

async function blobToWav(blob) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
  ctx.close();
  const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * RATE), RATE);
  const node = off.createBufferSource();
  node.buffer = decoded; node.connect(off.destination); node.start();
  return toWav((await off.startRendering()).getChannelData(0));
}

export default function StudioRecorder({ slug }) {
  const [state, setState] = useState("idle"); // idle | recording | working | done | error
  const [take, setTake] = useState(null);
  const [message, setMessage] = useState("");
  const recorder = useRef(null);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setState("working");
        try {
          const wav = await blobToWav(new Blob(chunks, { type: rec.mimeType }));
          setTake(URL.createObjectURL(wav)); setState("done");
        } catch { setMessage("Couldn’t process that take. Try again."); setState("error"); }
      };
      recorder.current = rec; rec.start(); setState("recording");
    } catch { setMessage("Microphone blocked. Allow it in the address bar and try again."); setState("error"); }
  }
  const stop = () => recorder.current?.stop();

  return (
    <div className="studio">
      <span className="studio-tag">Studio · {slug}.wav</span>
      <div className="studio-row">
        {state !== "recording" ? (
          <button className="studio-btn rec" onClick={start} disabled={state === "working"}><Circle size={13} fill="currentColor" /> {take ? "Record again" : "Record"}</button>
        ) : (
          <button className="studio-btn stop" onClick={stop}><Square size={12} fill="currentColor" /> Stop</button>
        )}
        {state === "recording" && <span className="studio-live">● recording…</span>}
        {state === "working" && <span className="studio-live">Preparing…</span>}
        {state === "error" && <span className="studio-live err">{message}</span>}
      </div>
      {take && state === "done" && (
        <div className="studio-row">
          <audio controls src={take} />
          <a className="studio-btn save" href={take} download={`${slug}.wav`}><Download size={14} /> Save {slug}.wav</a>
        </div>
      )}
      {take && state === "done" && <small>Put the saved file in <code>public/audio/</code> and redeploy.</small>}
    </div>
  );
}
