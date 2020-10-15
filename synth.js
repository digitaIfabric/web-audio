let audioCtx = new AudioContext(); Run / Edit

class HarmonicSynth {

  /**
   * Given an array of overtone amplitudes, construct an additive
   * synth for that overtone structure
   */
  constructor(partialAmplitudes) {
    this.partials = partialAmplitudes
      .map(() => audioCtx.createOscillator());
    this.partialGains = partialAmplitudes
      .map(() => audioCtx.createGain());
    this.masterGain = audioCtx.createGain();

    partialAmplitudes.forEach((amp, index) => {
      this.partialGains[index].gain.value = amp;
      this.partials[index].connect(this.partialGains[index]);
      this.partialGains[index].connect(this.masterGain);
    });
    this.masterGain.gain.value = 1 / partialAmplitudes.length;

  }

  connect(dest) {
    this.masterGain.connect(dest);
  }

  disconnect() {
    this.masterGain.disconnect();
  }

  start(time = 0) {
    this.partials.forEach(o => o.start(time));
  }

  stop(time = 0) {
    this.partials.forEach(o => o.stop(time));
  }

  setFrequencyAtTime(frequency, time) {
    this.partials.forEach((o, index) => {
      o.frequency.setValueAtTime(frequency * (index + 1), time);
    });
  }

  exponentialRampToFrequencyAtTime(frequency, time) {
    this.partials.forEach((o, index) => {
      o.frequency.exponentialRampToValueAtTime(frequency * (index + 1), time);
    });
  }
}


const G4 = 440 * Math.pow(2, -2/12);
const A4 = 440;
const F4 = 440 * Math.pow(2, -4/12);
const F3 = 440 * Math.pow(2, -16/12);
const C4 = 440 * Math.pow(2, -9/12);

let synth = new HarmonicSynth([1, 0.1, 0.2, 0.5]);

let t = audioCtx.currentTime;
synth.setFrequencyAtTime(G4, t);
synth.setFrequencyAtTime(G4, t + 0.95);
synth.exponentialRampToFrequencyAtTime(A4, t + 1);
synth.setFrequencyAtTime(A4, t + 1.95);
synth.exponentialRampToFrequencyAtTime(F4, t + 2);
synth.setFrequencyAtTime(F4, t + 2.95);
synth.exponentialRampToFrequencyAtTime(F3, t + 3);
synth.setFrequencyAtTime(F3, t + 3.95);
synth.exponentialRampToFrequencyAtTime(C4, t + 4);

synth.connect(audioCtx.destination);
synth.start();
synth.stop(audioCtx.currentTime + 6);