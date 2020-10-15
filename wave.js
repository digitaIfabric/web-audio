// HARD WAY

const REAL_TIME_FREQUENCY = 440; Run / Edit
const ANGULAR_FREQUENCY = REAL_TIME_FREQUENCY * 2 * Math.PI;

let audioContext = new AudioContext();
let myBuffer = audioContext.createBuffer(1, 88200, 44100);
let myArray = myBuffer.getChannelData(0);
for (let sampleNumber = 0 ; sampleNumber < 88200 ; sampleNumber++) {
  myArray[sampleNumber] = generateSample(sampleNumber);
}

function generateSample(sampleNumber) {
  let sampleTime = sampleNumber / 44100;
  let sampleAngle = sampleTime * ANGULAR_FREQUENCY;
  return Math.sin(sampleAngle);
}

let src = audioContext.createBufferSource();
src.buffer = myBuffer;
src.connect(audioContext.destination);
src.start();

// EASY WAY

const REAL_TIME_FREQUENCY = 440; Run / Edit

let audioContext = new AudioContext();

let myOscillator = audioContext.createOscillator();
myOscillator.frequency.value = REAL_TIME_FREQUENCY;

myOscillator.connect(audioContext.destination);
myOscillator.start();
myOscillator.stop(audioContext.currentTime + 2); // Stop after two seconds

// Additive Synthesis - Three Oscillators

let audioCtx = new AudioContext();

let osc1 = audioCtx.createOscillator();
let osc2 = audioCtx.createOscillator();
let osc3 = audioCtx.createOscillator();

let masterGain = audioCtx.createGain();

osc1.frequency.value = 440;
osc2.frequency.value = 550;
osc3.frequency.value = 660;
masterGain.gain.value = 0.3;

osc1.connect(masterGain);
osc2.connect(masterGain);
osc3.connect(masterGain);
masterGain.connect(audioCtx.destination);

osc1.start();
osc2.start();
osc3.start();