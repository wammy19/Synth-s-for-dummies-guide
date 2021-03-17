//This handles if the mouse is hovering over certain elements.

function animateOscillatorFunc() {

    animateOsc = true;
    oscColor = '#B92825';
}

function animateFilterFunc() {

    animateFilter = true;
    filterColor = '#464FE9';
}


function animateEnvelopesFunc() {

    animateEnvelopes = true;
    envelopeColor = '#49A22E';
}


function animateEffectsFunc() {

    animateEffects = true;
    effectsColor = '#B49F31';

}

// All elements are animated if the mouse is hovering over the logo.
function animateAll() {

    animateOscillatorFunc();
    animateFilterFunc();
    animateEnvelopesFunc();
    animateEffectsFunc();
}


function stopAnimation() {

    animateOsc = false;
    oscColor = '#901F1D';

    animateFilter = false;
    filterColor = '#3231A3';

    animateEnvelopes = false;
    envelopeColor = '#2F681E';

    animateEffects = false;
    effectsColor = '#897926';
}