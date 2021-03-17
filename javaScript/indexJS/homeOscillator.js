let animateOsc = false;
let oscColor = '#B92825';

// for p5 to have more than one canvas on a page, you must creat different p5 instances.
// I discovered this through their documentation.

const homeOscillator = ( sketch ) => {

    let rotateKnob = 0;
    let rotateAmount = 10;

    let angle1;
    let angle2;
    let angle3;
    let angle4;

    sketch.setup = () => {

    let canvas = sketch.createCanvas(340, 577);
    canvas.mouseOver(animate);
    canvas.mouseOut(noAnimate);
    };

    function animate() {

        animateOsc = true;
        oscColor = '#B92825';
    }

    function noAnimate() {

        animateOsc = false;
        oscColor = '#901F1D';
    }

    function drawKnob1() {

        if (animateOsc) {

            angle1 = sketch.map(sketch.sin(rotateKnob / 2), 0, 9, 0, 1400);
        }
        else {

            angle1 = 0;
        }

        sketch.push();
        sketch.translate(80, 200);

        sketch.rotate(angle1);
        rotateKnob += 1;

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle1 += 5;
    }

    function drawKnob2() {

        if (animateOsc) {

            angle2 = sketch.map(sketch.sin(rotateKnob + 100), 10, 4, 0, 200);
        }
        else {

            angle2 = 0;
        }

        sketch.push();
        sketch.translate(255, 200);

        sketch.rotate(angle2 - 80);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle2 += 400;
    }

    function drawKnob3() {

        if (animateOsc) {

            angle3 = sketch.map(sketch.sin(rotateKnob), 0, 30, 0, 1700);
        }
        else {

            angle3 = 0;
        }

        sketch.push();
        sketch.translate(255, 400);

        sketch.rotate(angle3 + 40);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle3 += 60
    }

    function drawSlider() {

        if (animateOsc) {

            angle4 = sketch.map(sketch.sin(rotateKnob / 3), 0, 30, 0, 1300);

        }
        else {

            angle4 = 0;
        }

        sketch.push();
        sketch.translate(40, 400);

        sketch.stroke(255);
        sketch.line(35, -80, 35, 80);

        sketch.stroke(oscColor);

        sketch.rect(0, angle4, 70, 30, 5);

        sketch.stroke(255);
        sketch.line(10, 15 + angle4, 60, 15 + angle4);

        sketch.pop();

        angle4 += 40;
    }

    function drawText() {

        sketch.strokeWeight(1);

        sketch.textSize(30);
        sketch.text('Oscillator', 104, 50);

        sketch.textSize(20);
        sketch.text('Pitch', 60, 280);
        sketch.text('Fine Tune', 213, 280);
        sketch.text('Shape', 226, 480);
    }

    function drawWavForm() {

        sketch.push();
        sketch.translate(120, 460);

        sketch.line(0, 0, 6, 15);
        sketch.line(6, 15, 19, 0);
        sketch.line(19, 0, 27, 15);

        sketch.pop();

        sketch.push();
        sketch.translate(120, 395);

        sketch.line(0, 0, 10, 0);
        sketch.line(10, 0, 10, 10);
        sketch.line(10, 10, 20, 10);
        sketch.line(20, 10, 20, 0);
        sketch.line(20, 0, 30, 0);

        sketch.pop();

        sketch.push();
        sketch.translate(120, 335);

        sketch.line(0, 0, 13, -10);
        sketch.line(13, -10, 26, 0);

        sketch.pop();
    }

    sketch.draw = () => {

        if (animateOsc) {

            rotateAmount += 1;
        }

        animateIfOnPhoneOrTablet();

        sketch.background(0);
        sketch.angleMode(sketch.DEGREES);

        sketch.fill(0, 0, 0, 0);
        sketch.stroke(oscColor);
        sketch.strokeWeight(4);

        sketch.rect(2, 2, 335, 570, 20);

        sketch.fill(oscColor);
        sketch.stroke(oscColor);

        drawKnob1();
        drawKnob2();
        drawKnob3();
        drawSlider();
        drawText();
        drawWavForm();
    }

};

let homeOscillatorSketch = new p5(homeOscillator, 'homeOscillatorCanvas');
