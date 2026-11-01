"""Generate warm narration MP3s with Kokoro (open-source neural TTS).
Usage: python make_voice.py chapters.json out_dir [voice]"""
import json, re, sys, numpy as np, soundfile as sf, subprocess
from kokoro_onnx import Kokoro

src, out, voice = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "af_heart")
k = Kokoro("kokoro.onnx", "voices.bin")

SPOKEN = [  # what the voice should say instead of what is written
    ("பதினெண்கீழ்க்கணக்கு", "Pathinen Keezhkanakku"), ("பதினெண்மேல்கணக்கு", "Pathinen Melkanakku"),
    ("CAT 1 and CAT 2", "C A T one and C A T two"), ("NLP", "N L P"), ("Ma’am", "Ma'am"),
]
SKIP = ("exact code and its output will be added",)  # placeholder notes, not story

def spoken(t):
    for a, b in SPOKEN: t = t.replace(a, b)
    return re.sub(r"[“”\"]", "", t).replace("’", "'")

def speed_for(s, first, last):
    sp = 0.93
    if s.endswith("!"): sp = 1.0
    if re.search(r"nervous|twist|unexpected|absence", s, re.I): sp = 0.9
    if re.search(r"impressed|highlight|Excellent|appreciated", s, re.I): sp = 0.98
    if re.search(r"remember|memor", s, re.I): sp = 0.88
    if first: sp = 0.88
    if last: sp = 0.85
    return sp

def sentences(par):
    parts = re.split(r"(?<=[.!?])[”\"]?\s+", par.strip())
    return [p for p in parts if p]

sr = 24000
for ch in json.load(open(src)):
    items = []  # (text, kind)
    for p in ch["paragraphs"]:
        if any(x in p for x in SKIP): continue
        ss = sentences(p)
        items += [(s, "para_end" if i == len(ss) - 1 else "s") for i, s in enumerate(ss)]
    for d in ch["dialogue"]:
        if d["who"] == "Narrator": items.append((d["line"], "para_end"))
    audio = [np.zeros(int(sr * 0.5), dtype=np.float32)]
    for i, (text, kind) in enumerate(items):
        nxt = items[i + 1][0] if i + 1 < len(items) else ""
        x, _ = k.create(spoken(text), voice=voice, speed=speed_for(text, i == 0, i == len(items) - 1), lang="en-us")
        audio.append(x.astype(np.float32))
        gap = 0.75 if kind == "para_end" else (0.12 if nxt[:1].islower() else 0.32)
        audio.append(np.zeros(int(sr * gap), dtype=np.float32))
    y = np.concatenate(audio); y = y / max(1e-6, np.abs(y).max()) * 0.9
    wav = f"{out}/{ch['slug']}.wav"; sf.write(wav, y, sr)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-af", "afade=t=out:st=%f:d=0.6" % (len(y) / sr - 0.6), "-codec:a", "libmp3lame", "-b:a", "96k", "-ac", "1", f"{out}/{ch['slug']}.mp3"], check=True)
    import os; os.remove(wav)
    print(ch["slug"], round(len(y) / sr, 1), "s", flush=True)
