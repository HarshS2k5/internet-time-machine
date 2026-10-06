// Web Audio API Synthesizer for Retro Tech & Time Travel Sounds

class RetroAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private isDialupPlaying: boolean = false;
  private dialupStopCallback: (() => void) | null = null;

  constructor() {
    // Read mute preference from localStorage
    const savedMute = localStorage.getItem('itm_sound_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    localStorage.setItem('itm_sound_muted', String(muted));
    if (muted && this.isDialupPlaying) {
      this.stopDialup();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Quick UI feedback click
  public playClick(freq = 600, duration = 0.04) {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + duration);

      gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might fail before user interaction
    }
  }

  // Sci-fi Cosmic Time Warp sound
  public playTimeWarp() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const duration = 1.6;

      // Oscillator 1: High rising sweep
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(150, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + duration * 0.7);
      osc1.frequency.exponentialRampToValueAtTime(400, now + duration);

      // Filter sweep
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + duration * 0.6);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);
      filter.Q.value = 4.0;

      gain1.gain.setValueAtTime(0.01, now);
      gain1.gain.linearRampToValueAtTime(this.volume * 0.35, now + duration * 0.4);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      filter.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + duration);

      // Oscillator 2: Sub-bass rumble
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(60, now);
      sub.frequency.linearRampToValueAtTime(90, now + duration * 0.5);
      sub.frequency.linearRampToValueAtTime(40, now + duration);

      subGain.gain.setValueAtTime(this.volume * 0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      sub.connect(subGain);
      subGain.connect(ctx.destination);

      sub.start(now);
      sub.stop(now + duration);
    } catch {
      // Audio error safety
    }
  }

  // Windows 95 Inspired Startup Arpeggio
  public playWin95Chime() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const notes = [
        { freq: 440.0, time: 0.0, dur: 1.2 },    // A4
        { freq: 554.37, time: 0.2, dur: 1.4 },   // C#5
        { freq: 659.25, time: 0.4, dur: 1.6 },   // E5
        { freq: 880.0, time: 0.7, dur: 2.2 },    // A5
        { freq: 1108.73, time: 0.9, dur: 2.5 },  // C#6
      ];

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(0.001, now + note.time);
        gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + note.time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur);
      });
    } catch {
      // Audio safety
    }
  }

  // ICQ "Uh-oh!" sound simulation
  public playICQUhOh() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Note 1: "Uh"
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, now);
      gain1.gain.setValueAtTime(this.volume * 0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // Note 2: "Oh!"
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(220, now + 0.18);
      osc2.frequency.linearRampToValueAtTime(200, now + 0.38);
      gain2.gain.setValueAtTime(this.volume * 0.35, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.45);
    } catch {
      // Audio safety
    }
  }

  // Full 56K Dial-up Handshake Simulator (authentic retro sound)
  public playDialupHandshake(onComplete?: () => void) {
    if (this.isMuted) return;
    this.stopDialup();

    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      this.isDialupPlaying = true;

      // Track active nodes to cancel if user stops
      const activeNodes: (AudioNode & { stop?: (when?: number) => void })[] = [];

      // Phase 1: Dial tone (350 Hz + 440 Hz) for 0.8s
      const dial1 = ctx.createOscillator();
      const dial2 = ctx.createOscillator();
      const dialGain = ctx.createGain();
      dial1.frequency.value = 350;
      dial2.frequency.value = 440;
      dialGain.gain.setValueAtTime(this.volume * 0.15, now);
      dialGain.gain.setValueAtTime(0.001, now + 0.8);

      dial1.connect(dialGain);
      dial2.connect(dialGain);
      dialGain.connect(ctx.destination);
      dial1.start(now);
      dial2.start(now);
      dial1.stop(now + 0.8);
      dial2.stop(now + 0.8);
      activeNodes.push(dial1, dial2);

      // Phase 2: DTMF tones (push-button dialing numbers: 7 tones)
      const dtmfFreqs = [
        [697, 1209], [770, 1336], [852, 1477],
        [941, 1336], [697, 1477], [770, 1209], [852, 1336]
      ];
      dtmfFreqs.forEach((freqPair, idx) => {
        const start = now + 0.9 + idx * 0.12;
        const o1 = ctx.createOscillator();
        const o2 = ctx.createOscillator();
        const g = ctx.createGain();
        o1.frequency.value = freqPair[0];
        o2.frequency.value = freqPair[1];
        g.gain.setValueAtTime(this.volume * 0.18, start);
        g.gain.setValueAtTime(0.001, start + 0.08);

        o1.connect(g);
        o2.connect(g);
        g.connect(ctx.destination);
        o1.start(start);
        o2.start(start);
        o1.stop(start + 0.08);
        o2.stop(start + 0.08);
        activeNodes.push(o1, o2);
      });

      // Phase 3: Ring tone at 1.9s - 2.6s
      const ringOsc = ctx.createOscillator();
      const ringGain = ctx.createGain();
      ringOsc.frequency.value = 440;
      ringGain.gain.setValueAtTime(this.volume * 0.15, now + 1.9);
      ringGain.gain.setValueAtTime(0.001, now + 2.6);
      ringOsc.connect(ringGain);
      ringGain.connect(ctx.destination);
      ringOsc.start(now + 1.9);
      ringOsc.stop(now + 2.6);
      activeNodes.push(ringOsc);

      // Phase 4: The Famous Answer Carrier & Handshake Screech (2.8s to 6.2s)
      const carrierStart = now + 2.8;
      const carrierDuration = 3.8;

      // 2100 Hz answer tone (v.25 echo suppressor disabler tone)
      const ansTone = ctx.createOscillator();
      const ansGain = ctx.createGain();
      ansTone.frequency.setValueAtTime(2100, carrierStart);
      ansGain.gain.setValueAtTime(this.volume * 0.22, carrierStart);
      ansGain.gain.exponentialRampToValueAtTime(0.001, carrierStart + 1.2);
      ansTone.connect(ansGain);
      ansGain.connect(ctx.destination);
      ansTone.start(carrierStart);
      ansTone.stop(carrierStart + 1.2);
      activeNodes.push(ansTone);

      // FSK noise screech & Baud negotiation
      const bufferSize = ctx.sampleRate * 2.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400, carrierStart + 1.0);
      bandpass.frequency.linearRampToValueAtTime(2200, carrierStart + 2.2);
      bandpass.frequency.linearRampToValueAtTime(1800, carrierStart + 3.2);
      bandpass.Q.value = 5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, carrierStart + 0.9);
      noiseGain.gain.linearRampToValueAtTime(this.volume * 0.2, carrierStart + 1.2);
      noiseGain.gain.setValueAtTime(this.volume * 0.18, carrierStart + 2.8);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, carrierStart + carrierDuration);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(carrierStart + 0.9);
      whiteNoise.stop(carrierStart + carrierDuration);
      activeNodes.push(whiteNoise);

      // Timer to wrap up
      const totalTimeMs = (carrierStart + carrierDuration - now) * 1000;
      const timeoutId = window.setTimeout(() => {
        this.isDialupPlaying = false;
        if (onComplete) onComplete();
      }, totalTimeMs);

      this.dialupStopCallback = () => {
        window.clearTimeout(timeoutId);
        activeNodes.forEach(node => {
          try {
            if (typeof node.stop === 'function') node.stop();
          } catch {
            // ignore
          }
        });
        this.isDialupPlaying = false;
      };
    } catch {
      this.isDialupPlaying = false;
    }
  }

  public stopDialup() {
    if (this.dialupStopCallback) {
      this.dialupStopCallback();
      this.dialupStopCallback = null;
    }
    this.isDialupPlaying = false;
  }

  public getIsDialupPlaying(): boolean {
    return this.isDialupPlaying;
  }

  public playTeleport(): void {
    this.playTimeWarp();
  }
}


export const audioService = new RetroAudioService();
