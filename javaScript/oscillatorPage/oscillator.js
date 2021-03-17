let osc, fft, trigger;

let attackTime;
let decayTime;
let susTime;
let releaseTime;

let button;

let envelope;
let envelope2;

let square, pulse;
let modulation;

let pitch;

let lfoAmount;
let lfoSpeed;

let pitchMod;

let oscCanvas;

// The p5.sound library is used to generate all the sound examples of synthesizers on the page.
// The p5.sound library was heavily referenced.
function setup() {

    setToDefaultEnvelope();

    oscCanvas = createCanvas(200, 200);

    modulation = 0.5;

    lfoSpeed = 0;

    pitchMod = 0;

    osc = new p5.SinOsc();
    fft = new p5.FFT();
    pulse = new p5.Pulse(240);

    envelope = new p5.Envelope();
    envelope2 = new p5.Envelope();

    envelope.setADSR(attackTime, decayTime, susTime, releaseTime);
    envelope2.setADSR(attackTime, decayTime, susTime, releaseTime);

    osc.freq(240);
    osc.amp(envelope);

    pulse.amp(envelope2);
    pulse.start();
}


function draw() {

    // This checks to which div the canvas should be draw depending on the size of the view port.
    if (window.windowWidth < 772) {

        oscCanvas.parent('oscillatorCanvas2');
    }
    else {

        oscCanvas.parent('oscillatorCanvas1');
    }

    pulseWidthSliderFunction();
    pitchLfo();

    background('#670201');

    drawOscilloscope();
}


function setToDefaultEnvelope() {

    attackTime = 0.5;
    decayTime = 3;
    susTime = 3;
    releaseTime = 1;
}


// This functions are triggered on click by the user.
function playSin() {

    osc.start();
    osc.setType('sine');

    envelope.play();
}


function playSquare() {

    osc.stop();
    envelope2.play();
}


function playTriangle() {

    osc.start();
    osc.setType('triangle');

    envelope.play();
}


function playSaw() {

    osc.start();
    osc.setType('sawtooth');

    envelope.play();
}


// Modulates the pitch of the oscillator.
function pitchLfo() {

    // Values from sliders are assigned to parameter to effect the pitch and modulation.
    let pitchStr = document.getElementById("pitchSlider").value;
    pitch = parseFloat(pitchStr);

    let lfoAmountStr = document.getElementById("lfoAmountSlider").value;
    lfoAmount = parseFloat(lfoAmountStr);

    let lfoSpeedStr = document.getElementById("lfoSpeedSlider").value;
    let lfoSpeedAmount = parseFloat(lfoSpeedStr);

    // Pitch modulation is done with the math function sin.
    pitchMod = map(sin(lfoSpeed), 0, 10, 0, lfoAmount);

    pulse.freq(pitch + pitchMod);
    osc.freq(pitch + pitchMod);

    lfoSpeed += lfoSpeedAmount;
}


function pulseWidthSliderFunction() {

    let modulationStr = document.getElementById("pulseModRange").value;
    modulation = parseFloat(modulationStr);

    pulse.width(modulation);
}


function drawOscilloscope() {

    // THIS CODE IS NOT MINE.
    // This draws a visual representation of the sound as a waveform.
    // I did not write it and have provided reference in the report.html.

    let waveform = fft.waveform();

    beginShape();
    strokeWeight(2);
    noFill();
    stroke(255);
    trigger = 0;

    for (let i = 0; i < waveform.length; i++){

        if ((waveform[i] > 0) && (waveform[i - 1] <= 0) && (trigger === 0)) {

            trigger = 1;
            firstPos = i;
        }

        if (trigger === 1) {

            var x = map((i - firstPos), 0, waveform.length, 0, width * 3);
            var y = map(waveform[i], -1, 1, height, 0);
        }

        vertex(x, y);
    }
    endShape();
}