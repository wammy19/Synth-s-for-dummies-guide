let osc, fft, trigger;

let envelope;

let delayToggle;
let delay;

// Links to audio recorded by myself.
// p5.sound has capabilities to play audio files but i just couldn't get it to work.
// So I'm using native JS to play audio, this means you won't be able to see the audio in the
// oscilloscope.
let drySample = new Audio('./javaScript/effectsPage/audio/drySynth.wav');
let reverbSample = new Audio('./javaScript/effectsPage/audio/reverbSynth.wav');
let chorusSample =  new Audio('./javaScript/effectsPage/audio/chorusSynth.wav');

let oscCanvas;

// The p5.sound library is used to generate all the sound examples of synthesizers on the page.
// The p5.sound library was heavily referenced.
function setup() {

    delayToggle = false;

    oscCanvas = createCanvas(200, 200);

    osc = new p5.Oscillator();
    envelope = new p5.Envelope();
    fft = new p5.FFT();

    delay = new p5.Delay();

    envelope.setADSR(0, 0.1, 0.1, 0.5);
    envelope.setRange(0.5, 0);

    osc.start();
    osc.freq(400);
    osc.amp(envelope);
    osc.setType('triangle');
}


function draw() {

    // This checks to which div the canvas should be draw depending on the size of the view port.
    if (window.windowWidth < 772) {

        oscCanvas.parent('oscillatorCanvas2');
    }
    else {

        oscCanvas.parent('oscillatorCanvas1');
    }

    background('#A9912E');

    buttonStyling();
    drawOscilloscope();
    setDelay();
}


// Other than delay, I played around with p5's reverb effect.
// This did not work to well with certain browsers, reverbs are generally very tasking on processing.
// There for I opted to only have delay as an interactive effect.
function setDelay() {

    let delayTimeStr = document.getElementById("delayTimeSlider").value;
    let time = parseFloat(delayTimeStr);

    let feedbackStr = document.getElementById("feedbackSlider").value;
    let feedback = parseFloat(feedbackStr);

    let mixStr = document.getElementById("delayAmountSlider").value;
    let mix = parseFloat(mixStr);

    delay.process(osc, time, feedback);
    delay.drywet(mix);
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


function playOsc() {

    stopAudio();

    osc.start();
    envelope.play();
}


function delayOnOff() {

    if (delayToggle) {

        delayToggle = false;
        delay.connect();
    }
    else {

        delayToggle = true;
        delay.disconnect();
    }
}


function playDrySynth() {

    stopAudio();
    resetButtonColors();

    document.getElementById('toggleDry').style.backgroundColor = '#CAA800';

    restButtonWhenAudioStops(14000);

    drySample.play();
}


function playChrousSynth() {

    stopAudio();
    resetButtonColors();

    document.getElementById('toggleChorus').style.backgroundColor = '#CAA800';

    restButtonWhenAudioStops(14000);

    chorusSample.play();
}


function playReverbSynth() {

    stopAudio();
    resetButtonColors();

    document.getElementById('toggleReverb').style.backgroundColor = '#CAA800';

    restButtonWhenAudioStops(16200);

    reverbSample.play();
}


function restButtonWhenAudioStops(milliSeconds) {

    setTimeout(function () {

        resetButtonColors();
    }, milliSeconds);
}

function stopAudio() {

    resetButtonColors();

    chorusSample.pause();
    chorusSample.currentTime = 0;

    drySample.pause();
    drySample.currentTime = 0;

    reverbSample.pause();
    reverbSample.currentTime = 0;
}


function resetButtonColors() {

    document.getElementById('playButton').style.backgroundColor = 'black';
    document.getElementById('toggleDry').style.backgroundColor = 'black';
    document.getElementById('toggleReverb').style.backgroundColor = 'black';
    document.getElementById('toggleChorus').style.backgroundColor = 'black';
}


function buttonStyling() {

    if (delayToggle === false) {

        document.getElementById('delayToggleButton').style.backgroundColor = '#CAA800';
        document.getElementById('delayToggleButton').value = 'On';
    }
    else {

        document.getElementById('delayToggleButton').style.backgroundColor = 'black';
        document.getElementById('delayToggleButton').value = 'Off';
    }
}