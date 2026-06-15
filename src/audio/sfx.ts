// Synthesised SFX via Web Audio API — lush, reverb-forward pads.
// Hover + click are soft reverberant pad swells; a quiet ambient pad drones
// continuously in the background while sound is enabled. No asset files.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let reverb: ConvolverNode | null = null;
let muted = true;

export function isMuted() { return muted; }

export function setMuted(m: boolean) {
  muted = m;
  if (m) {
    stopAmbient();
  } else {
    const c = getCtx();
    if (c) startAmbient();
  }
}

function buildImpulse(c: AudioContext, seconds = 3.2, decay = 2.4): AudioBuffer {
  const rate = c.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = c.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

function getCtx(): AudioContext | null {
  if (muted) return null;
  if (!ctx || ctx.state === 'closed') {
    ctx = new AudioContext();

    master = ctx.createGain();
    master.gain.value = 0.85;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 4200; // warmer / thicker — rolls off the highs
    lp.Q.value = 0.4;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 26;
    comp.ratio.value = 3.2;
    comp.attack.value = 0.004;
    comp.release.value = 0.22;

    master.connect(lp);
    lp.connect(comp);
    comp.connect(ctx.destination);

    // Big lush reverb, mixed in parallel
    reverb = ctx.createConvolver();
    reverb.buffer = buildImpulse(ctx);
    const rgain = ctx.createGain();
    rgain.gain.value = 0.5;
    reverb.connect(rgain);
    rgain.connect(comp);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Play a soft pad of detuned voices through dry master + heavy reverb send
function pad(
  c: AudioContext,
  freqs: number[],
  { attack = 0.08, release = 0.7, peak = 0.05, wet = 0.6, type = 'triangle' as OscillatorType } = {},
) {
  const t = c.currentTime;
  const bus = c.createGain();
  bus.gain.setValueAtTime(0.0001, t);
  bus.gain.exponentialRampToValueAtTime(peak, t + attack);
  bus.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);

  const tone = c.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 1500; // darker, thicker pad timbre

  bus.connect(tone);
  tone.connect(master!);
  if (reverb) {
    const send = c.createGain();
    send.gain.value = wet;
    tone.connect(send);
    send.connect(reverb);
  }

  freqs.forEach(f => {
    [-5, 5].forEach(det => {
      const o = c.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.detune.value = det;
      const g = c.createGain();
      g.gain.value = 1 / (freqs.length * 2);
      o.connect(g);
      g.connect(bus);
      o.start(t);
      o.stop(t + attack + release + 0.1);
    });
  });
}

export function sfxHover() {
  const c = getCtx();
  if (!c) return;
  // warm low-mid dyad — soft, thick, lush
  pad(c, [329.63, 493.88], { attack: 0.05, release: 0.55, peak: 0.04, wet: 0.7 });
}

export function sfxClick() {
  const c = getCtx();
  if (!c) return;
  // deep, soft reverberant chord (with a sub) — thick and warm
  pad(c, [130.81, 196.0, 261.63, 329.63], { attack: 0.025, release: 1.3, peak: 0.07, wet: 0.75 });
}

// kept for API compatibility (used on menu open/close) — a gentle low reverb swell
export function sfxWhoosh() {
  const c = getCtx();
  if (!c) return;
  pad(c, [146.83, 220.0], { attack: 0.12, release: 1.3, peak: 0.06, wet: 0.85, type: 'sine' });
}

export function sfxBoot() {
  const c = getCtx();
  if (!c) return;
  const notes = [130.81, 196.0, 261.63, 392.0];
  notes.forEach((f, i) => {
    setTimeout(() => {
      const cc = getCtx();
      if (cc) pad(cc, [f], { attack: 0.04, release: 0.9, peak: 0.055, wet: 0.7, type: 'sine' });
    }, i * 140);
  });
}

/* ---------------- Ambient pad loop ---------------- */
let ambient: { stop: () => void } | null = null;

function startAmbient() {
  if (ambient || !ctx || !master || !reverb) return;
  const c = ctx;
  const t = c.currentTime;

  const out = c.createGain();
  out.gain.setValueAtTime(0.0001, t);
  out.gain.exponentialRampToValueAtTime(0.045, t + 5); // slow fade-in, quiet

  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 600;
  lp.Q.value = 0.4;

  out.connect(lp);
  lp.connect(master);
  const send = c.createGain();
  send.gain.value = 0.7;
  lp.connect(send);
  send.connect(reverb);

  // Warm Amaj-ish drone: A2 · E3 · A3 · C#4
  const freqs = [110, 164.81, 220, 277.18];
  const nodes: Array<OscillatorNode> = [];
  freqs.forEach(f => {
    [-7, 7].forEach(det => {
      const o = c.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      o.detune.value = det;
      const g = c.createGain();
      g.gain.value = 1 / (freqs.length * 2);
      o.connect(g);
      g.connect(out);
      o.start(t);
      nodes.push(o);
    });
  });

  // Slow filter sweep for movement
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 320;
  lfo.connect(lfoGain);
  lfoGain.connect(lp.frequency);
  lfo.start(t);
  nodes.push(lfo);

  ambient = {
    stop: () => {
      const tt = c.currentTime;
      out.gain.cancelScheduledValues(tt);
      out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), tt);
      out.gain.exponentialRampToValueAtTime(0.0001, tt + 1.6);
      nodes.forEach(n => { try { n.stop(tt + 1.7); } catch { /* already stopped */ } });
    },
  };
}

function stopAmbient() {
  if (ambient) { ambient.stop(); ambient = null; }
}
