import { InstrumentType } from '../types';

class AudioService {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  public async playNote(frequency: number, instrument: InstrumentType) {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.frequency.value = frequency;

    const now = ctx.currentTime;
    
    // Iniciar el oscilador inmediatamente antes de configurar las envolventes y el stop.
    // Esto previene el error "Can't call stop() without calling start()".
    osc.start(now);

    switch (instrument) {
      case InstrumentType.PIANO:
        // Piano: Triangle wave, fast attack, exponential decay
        osc.type = 'triangle';
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.6, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        osc.stop(now + 1.5);
        break;

      case InstrumentType.GUITAR:
        // Guitar: Sawtooth (filtered ideally, but raw here), pluck envelope
        osc.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
        osc.stop(now + 2.0);
        break;

      case InstrumentType.FLUTE:
        // Flute: Sine wave, soft attack, sustain
        osc.type = 'sine';
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.5, now + 0.2);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.5); // Sustain
        gainNode.gain.linearRampToValueAtTime(0, now + 1.2); // Release
        osc.stop(now + 1.2);
        break;
    }
  }
}

export const audioService = new AudioService();