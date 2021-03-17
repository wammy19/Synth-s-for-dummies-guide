let filterColor = '#3231A3';

const homeFilter = ( sketch ) => {

    let rotateKnob = 0;
    let rotateAmount = 10;

    let angle1;
    let angle4;

    sketch.setup = () => {

        let canvas = sketch.createCanvas(340, 577);
        canvas.mouseOver(animate);
        canvas.mouseOut(noAnimate);

    };

    function animate() {

        animateFilter = true;
        filterColor = '#464FE9';
    }

    function noAnimate() {

        animateFilter = false;
        filterColor = '#3231A3';
    }

    function drawSlider1() {

        if (animateFilter) {

            angle4 = sketch.map(sketch.sin(rotateKnob / 3), 0, 30, 0, 1300);
        }
        else {

            angle4 = 0;
        }

        sketch.push();
        sketch.translate(40, 200);

        sketch.stroke(255);
        sketch.line(35, -80, 35, 80);

        sketch.stroke(filterColor);

        sketch.rect(0, angle4, 70, 30, 5);

        sketch.stroke(255);
        sketch.line(10, 15 + angle4, 60, 15 + angle4);

        sketch.pop();

        angle4 += 40;
    }

    function drawSlider2() {

        if (animateFilter) {

            angle4 = sketch.map(sketch.sin(rotateKnob / 2), 0, 40, 0, 1400);
        }
        else {

            angle4 = 0;
        }

        sketch.push();
        sketch.translate(220, 200);

        sketch.stroke(255);
        sketch.line(35, -80, 35, 80);

        sketch.stroke(filterColor);

        sketch.rect(0, angle4 - 20, 70, 30, 5);

        sketch.stroke(255);
        sketch.line(10, 15 + angle4 - 20, 60, 15 + angle4 - 20);

        sketch.pop();

        angle4 += 0.1;
    }

    function drawKnob1() {

        if (animateFilter) {

            angle1 = sketch.map(sketch.sin(rotateKnob / 2), 0, 9, 0, 1100);
        }
        else {

            angle1 = 0;
        }

        sketch.push();
        sketch.translate(255, 400);

        sketch.rotate(angle1 - 40);
        rotateKnob += 1;

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle1 += 5;
    }

    function drawKnob2() {

        if (animateFilter) {

            angle1 = sketch.map(sketch.sin(rotateKnob - 40), 0, 30, 0, 1500);
        }
        else {

            angle1 = 0;
        }

        sketch.push();
        sketch.translate(80, 400);

        sketch.rotate(angle1 + 30);
        rotateKnob += 1;

        sketch.ellipse(0, 0, 90, 90);

        sketch.stroke(255);
        sketch.strokeWeight(5);
        sketch.line(0, 0, 0, -40);

        sketch.pop();

        angle1 += 9;
    }

    function drawText() {

        sketch.strokeWeight(1);

        sketch.textSize(30);
        sketch.text('Filter', 140, 50);

        sketch.textSize(20);
        sketch.text('Cutoff', 48, 308);
        sketch.text('Resonance', 202, 308);
        sketch.text('Env Amount', 200, 480);
        sketch.text('Hi Cut', 53, 480);
    }

    sketch.draw = () => {

        if (animateFilter) {

            rotateAmount += 1;
        }

        sketch.background(0);
        sketch.angleMode(sketch.DEGREES);

        sketch.fill(0, 0, 0, 0);
        sketch.stroke(filterColor);
        sketch.strokeWeight(4);

        sketch.rect(2, 2, 335, 570, 20);

        sketch.fill(filterColor);
        sketch.stroke(filterColor);

        drawKnob1();
        drawKnob2();
        drawSlider1();
        drawSlider2();
        drawText();
    }
};

let animateFilter = false;

let homeFilterSketch = new p5(homeFilter, 'homeFilterCanvas');
