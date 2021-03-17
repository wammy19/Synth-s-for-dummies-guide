let envelopeColor = '#2F681E';

// for p5 to have more than one canvas on a page, you must creat different p5 instances.
// I discovered this through their documentation.

const homeEnvelope = ( sketch ) => {

    let rotateKnob = 0;
    let rotateAmount = 10;

    let angle1;
    let angle2;
    let angle3;

    sketch.setup = () => {

        let canvas = sketch.createCanvas(340, 577);
        canvas.mouseOver(animate);
        canvas.mouseOut(noAnimate);

    };

    function animate() {

        animateEnvelopes = true;
        envelopeColor = '#49A22E';
    }

    function noAnimate() {

        animateEnvelopes = false;
        envelopeColor = '#2F681E';
    }

    function drawKnob1() {

        if (animateEnvelopes) {

            angle1 = sketch.map(sketch.sin(rotateKnob / 2), 0, 9, 0, 900);
        }
        else {

            angle1 = 0;
        }

        sketch.push();
        sketch.translate(80, 200);

        sketch.rotate(angle1 + 50);
        rotateKnob += 1;

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle1 += 5;
    }

    function drawKnob2() {

        if (animateEnvelopes) {

            angle2 = sketch.map(sketch.sin(rotateKnob + 100), 10, 4, 0, 200);
        }
        else {

            angle2 = 0;
        }

        sketch.push();
        sketch.translate(255, 200);

        sketch.rotate(angle2 + 100);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle2 += 400;
    }

    function drawKnob3() {

        if (animateEnvelopes) {

            angle3 = sketch.map(sketch.sin(rotateKnob), 0, 30, 0, 1700);
        }
        else {

            angle3 = 0;
        }

        sketch.push();
        sketch.translate(80, 400);

        sketch.rotate(angle3 - 60);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle3 += 60
    }

    function drawKnob4() {

        if (animateEnvelopes) {

            angle3 = sketch.map(sketch.sin(rotateKnob + 90), 0, 30, 0, 1600);
        }
        else {

            angle3 = 0;
        }

        sketch.push();
        sketch.translate(255, 400);

        sketch.rotate(angle3 -20);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle3 -= 20
    }

    function drawText() {

        sketch.strokeWeight(1);

        sketch.textSize(30);
        sketch.text('Envelope', 104, 50);

        sketch.textSize(20);
        sketch.text('Attack', 55, 280);
        sketch.text('Decay', 230, 280);
        sketch.text('Sustain', 49, 480);
        sketch.text('Release', 220, 480);
    }

    sketch.draw = () => {

        if (animateEnvelopes) {
            rotateAmount += 1;
        }

        sketch.background(0);
        sketch.angleMode(sketch.DEGREES);

        sketch.fill(0, 0, 0, 0);
        sketch.stroke(envelopeColor);
        sketch.strokeWeight(4);

        sketch.rect(2, 2, 335, 570, 20);

        sketch.fill(envelopeColor);
        sketch.stroke(envelopeColor);

        drawKnob1();
        drawKnob2();
        drawKnob3();
        drawKnob4();
        drawText();
    }
};

let animateEnvelopes = false;

// Creates p5 instance.
let homeEnvelopeSketch = new p5(homeEnvelope, 'homeEnvelopeCanvas');
