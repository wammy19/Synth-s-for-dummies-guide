let osc, fft, trigger;

let noise;
let cutOff;
let cutOffMod;
let resonance;

let filter;
let buttonSelector;

let started = false;
let noiseStarted = false;

let lfoAmount;
let lfoSpeed;

let modulation;

let filterMod = 0;

let oscCanvas;

let sliderInputs = document.getElementsByTagName('filterControls');

// The p5.sound library is used to generate all the sound examples of synthesizers on the page.
// The p5.sound library was heavily referenced.

function setup() {

    oscCanvas = createCanvas(200, 200);

    modulation = 0;
    cutOffMod = 0;
    lfoSpeed = 0;

    noise = new p5.Noise('white');
    filter = new p5.Filter();
    osc = new p5.Oscillator();
    fft = new p5.FFT();

    osc.freq(200);

    filter.setType('lowpass');

    noise.disconnect();
    noise.connect(filter);

    osc.disconnect();
    osc.connect(filter);
    osc.setType('square');
    osc.amp(1);

    buttonSelector = 'noise';
}


function draw() {

    if (window.windowWidth < 772) {

        oscCanvas.parent('oscillatorCanvas2');
    }
    else {

        oscCanvas.parent('oscillatorCanvas1');
    }

    background('#393AC1');

    adjustToSliderValues();
    drawFreqSpectrum();
    checkButtonSelection();
    filterLfo();
    checkOscOrNoiseSource()
}


function changeFilterLow() {

    filter.setType('lowpass')
}


function changeFilterHigh() {

    document.getElementById('highPassButton').style.backgroundColor = '#3C33C9';

    filter.setType('highpass');
}


function changeBandPass() {

    document.getElementById('bandPassButton').style.backgroundColor = '#3C33C9';

    filter.setType('bandpass');
}

function startNoise() {

    buttonSelector = 'noise';
}


function playSquareFilterPage() {

    buttonSelector = 'square';
    osc.setType('square');
}


function playSawFilterPage() {

    buttonSelector = 'sawtooth';
    osc.setType('sawtooth');
}


function startSynth () {

    started = true;

    if (buttonSelector === 'square') {

        noise.stop();

        osc.setType('square');
        osc.start();
    }
    else if (buttonSelector === 'sawtooth') {

        noise.stop();

        osc.setType('sawtooth');
        osc.start();
    }
    else if (buttonSelector === 'noise') {

        noiseStarted = true;

        osc.stop();
        noise.start();
    }
}


function stopSound() {

    started = false;

    osc.stop();
    noise.stop();
}


function adjustToSliderValues() {

    let cutOffStr = document.getElementById("cutOffSlider").value;
    cutOff = parseFloat(cutOffStr);

    let resonanceStr = document.getElementById("resonanceSlider").value;
    resonance = parseFloat(resonanceStr);

    filter.res(resonance);
}


function drawFreqSpectrum() {

    // THIS CODE IS NOT MINE
    // Draws a visual representation of the frequency spectrum.
    // I did not write it and have provided reference in the report.html.

    let spectrum = fft.analyze();

    noStroke();
    fill(255);

    for (var i = 0; i< spectrum.length; i++) {

        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);

        rect(x, height, width / spectrum.length, h);
    }
}


// Modulates the filter cutoff.
function filterLfo() {

    // Values from sliders are assigned to parameter to effect the filter cutoff and modulation.

    let lfoAmountStr = document.getElementById("lfoAmountSlider").value;
    lfoAmount = parseFloat(lfoAmountStr);

    let lfoSpeedStr = document.getElementById("lfoSpeedSlider").value;
    let lfoSpeedAmount = parseFloat(lfoSpeedStr);

    // Pitch modulation is done with the math function sin.
    filterMod = map(sin(lfoSpeed), 0, 5, 0, lfoAmount * 20);

    filter.freq(cutOff + filterMod);

    lfoSpeed += lfoSpeedAmount;
}

function checkOscOrNoiseSource() {

    if (buttonSelector === 'square' && noiseStarted) {

        started = true;
        noiseStarted = false;

        noise.stop();
        osc.setType('square');
        startSynth();
    }
    else if (buttonSelector === 'sawtooth' && noiseStarted) {

        started = true;
        noiseStarted = false;

        noise.stop();
        osc.setType('sawtooth');
        startSynth();
    }
    else if (buttonSelector === 'noise' && started) {

        started = false;
        noiseStarted = true;

        osc.stop();
        noise.start();
    }
}

function checkButtonSelection() {

    // A number of checks are done here to change the color of the buttons on the page depending on
    // Which filter is selected.
    // This could have been done more elegantly.
    // Perhaps a switch and declaration could have been used.


    if (filter.biquad.type === 'lowpass') {

        document.getElementById('lowPassButton').style.backgroundColor = '#3C33C9';
    }
    else {

        document.getElementById('lowPassButton').style.backgroundColor = 'black';
    }

    if (filter.biquad.type === 'highpass') {

        document.getElementById('highPassButton').style.backgroundColor = '#3C33C9';
    }
    else {

        document.getElementById('highPassButton').style.backgroundColor = 'black';
    }

    if (filter.biquad.type === 'bandpass') {

        document.getElementById('bandPassButton').style.backgroundColor = '#3C33C9';
    }
    else {

        document.getElementById('bandPassButton').style.backgroundColor = 'black';
    }

    if (buttonSelector === 'noise') {
        document.getElementById('noiseButton').style.backgroundColor = '#3C33C9';
    }
    else {
        document.getElementById('noiseButton').style.backgroundColor = 'black';
    }

    if (buttonSelector === 'square') {
        document.getElementById('squareButton').style.backgroundColor = '#3C33C9';
    }
    else {
        document.getElementById('squareButton').style.backgroundColor = 'black';
    }

    if (buttonSelector === 'sawtooth') {
        document.getElementById('sawButton').style.backgroundColor = '#3C33C9';
    }
    else {
        document.getElementById('sawButton').style.backgroundColor = 'black';
    }

    if (osc.started === false && noise.started === false) {

        document.getElementById('stopButton').style.backgroundColor = '#3C33C9';
        document.getElementById('playButton').style.backgroundColor = 'black';
    }
    else {

        document.getElementById('stopButton').style.backgroundColor = 'black';
        document.getElementById('playButton').style.backgroundColor = '#3C33C9';
    }

    if (osc.started === false && noise.started === false) {

        document.getElementById('stopButton2').style.backgroundColor = '#3C33C9';
        document.getElementById('playButton2').style.backgroundColor = 'black';
    }
    else {

        document.getElementById('stopButton2').style.backgroundColor = 'black';
        document.getElementById('playButton2').style.backgroundColor = '#3C33C9';
    }
}