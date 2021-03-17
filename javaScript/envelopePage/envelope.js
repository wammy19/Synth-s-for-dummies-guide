let osc, fft, trigger;

let attackTime;
let decayTime;
let susTime;
let releaseTime;

let envelope;
let envelopeNoise;

let noise;

let filter;

let played;

let noiseToggle = false;

let oscCanvas;

// The p5.sound library is used to generate all the sound examples of synthesizers on the page.
// The p5.sound library was heavily referenced.
function setup() {

    setToDefaultEnvelope();

    oscCanvas = createCanvas(200, 200);


    osc = new p5.SinOsc();
    noise = new p5.Noise('white');
    fft = new p5.FFT();
    filter = new p5.LowPass();

    filter.freq(2300);

    envelope = new p5.Envelope();
    envelopeNoise = new p5.Envelope();

    envelope.setADSR(attackTime, decayTime, susTime, releaseTime);
    envelopeNoise.setADSR(attackTime, decayTime, susTime, releaseTime);

    envelope.setRange(0.5, 0);
    envelopeNoise.setRange(3,0);

    osc.start();
    osc.freq(280);
    osc.amp(envelope);
    osc.setType('sine');

    // noise.start();
    noise.amp(envelope);
    noise.disconnect();
    noise.connect(filter);
}


function draw() {

    // This checks to which div the canvas should be draw depending on the size of the view port.
    if (window.windowWidth < 772) {

        oscCanvas.parent('oscillatorCanvas2');
    }
    else {

        oscCanvas.parent('oscillatorCanvas1');
    }

    background('#377B23');

    adjustToSliderValues();
    drawOscilloscope();
}


function addNoise() {

    let element = document.getElementById("playButtonNoise");
    let element2 = document.getElementById("playButtonNoise2");

    // Changes in styling done if buttons are pressed.
    if (noiseToggle === false) {

        noiseToggle = true;

        element.style.backgroundColor = "#008100";
        element2.style.backgroundColor = "#008100";

        noise.start();
    }
    else {

        noiseToggle = false;

        element.style.backgroundColor = "black";
        element2.style.backgroundColor = "black";

        noise.stop();
    }
}


function stopSound() {

    osc.stop();
    noise.stop();

    setup();
}


function setToDefaultEnvelope() {

    attackTime = 0.5;
    decayTime = 1;
    susTime = 1;
    releaseTime = 1;
}


function playSin() {

    let element = document.getElementById("playButtonNoise");

    if (noiseToggle === true) {

        noise.start();
    }
    else {

        noise.stop();
    }

    osc.start();
    envelope.play();
}


function adjustToSliderValues() {

    let attackStr = document.getElementById("attackTimeSlider").value;
    attackTime = parseFloat(attackStr);

    let decayStr = document.getElementById("decayTimeSlider").value;
    decayTime = parseFloat(decayStr);

    let sustainStr = document.getElementById("sustainTimeSlider").value;
    susTime = parseFloat(sustainStr);

    let releaseStr = document.getElementById("releaseTimeSlider").value;
    releaseTime = parseFloat(releaseStr);

    envelope.setADSR(attackTime, decayTime, susTime, releaseTime);
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
