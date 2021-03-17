let effectsColor = '#897926';


// for p5 to have more than one canvas on a page, you must creat different p5 instances.
// I discovered this through their documentation.

const homeEffects = ( sketch ) => {

    // On this page the p5 library is used to draw shapes and animated using the sin function.
    // The function called "Draw" runs in a loop.
    let rotateKnob = 0;
    let rotateAmount = 10;

    let angle1;
    let angle2;
    let angle3;

    sketch.setup = () => {

        let canvas = sketch.createCanvas(340, 577);

        // mouseOver and Mouse out are p5 functions.
        canvas.mouseOver(animate);
        canvas.mouseOut(noAnimate);

    };

    function animate() {

        animateEffects = true;
        effectsColor = '#B49F31';
    }

    function noAnimate() {

        animateEffects = false;
        effectsColor = '#897926';
    }

    function drawKnob1() {

        if (animateEffects) {

            angle1 = sketch.map(sketch.sin(rotateKnob * 2), 0, 30, 0, 1100);
        }
        else {

            angle1 = 0;
        }

        sketch.push();
        sketch.translate(80, 200);

        sketch.rotate(angle1 -120);
        rotateKnob += 1;

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle1 += 5;
    }

    function drawKnob2() {

        if (animateEffects) {

            // Sin function to increment and decrement values for animations.
            angle2 = sketch.map(sketch.sin(rotateKnob - 20), 0, 30, 0, 1300);
        }
        else {

            angle2 = 0;
        }

        sketch.push();
        sketch.translate(255, 200);

        sketch.rotate(angle2 + 110);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle2 += 400;
    }

    function drawKnob3() {

        if (animateEffects) {
            // Sin function to increment and decrement values for animations.
            angle3 = sketch.map(sketch.sin(rotateKnob + 40), 0, 30, 0, 1300);
        }
        else {

            angle3 = 0;
        }

        sketch.push();
        sketch.translate(80, 400);

        sketch.rotate(angle3);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle3 += 60
    }

    function drawKnob4() {

        if (animateEffects) {
            // Sin function to increment and decrement values for animations.
            angle3 = sketch.map(sketch.sin(rotateKnob -10), 0, 30, 0, 1900);
        }
        else {

            angle3 = 0;
        }

        sketch.push();
        sketch.translate(255, 400);

        sketch.rotate(angle3 + 80);

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle3 += 20
    }

    function drawText() {

        sketch.strokeWeight(1);

        sketch.textSize(30);
        sketch.text('Effects', 130, 50);

        sketch.textSize(20);
        sketch.text('Delay Time', 35, 280);
        sketch.text('Feedback', 219, 280);
        sketch.text('Mix', 66, 480);
        sketch.text('Chorus Amt', 199, 480);
    }

    sketch.draw = () => {

        if (animateEffects) {
            rotateAmount += 1;
        }

        sketch.background(0);
        sketch.angleMode(sketch.DEGREES);

        sketch.fill(0, 0, 0, 0);
        sketch.stroke(effectsColor);
        sketch.strokeWeight(4);

        sketch.rect(2, 2, 335, 570, 20);

        sketch.fill(effectsColor);
        sketch.stroke(effectsColor);

        drawKnob1();
        drawKnob2();
        drawKnob3();
        drawKnob4();
        drawText();
    }
};

let animateEffects = false;

// Creates p5 instance.
let homeEffectsSkecth = new p5(homeEffects, 'homeEffectsCanvas');
