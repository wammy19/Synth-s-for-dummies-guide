// This animates the home screen on tablets and phones. This is because you cannot hover over on
// a phones or tablet.

function animateIfOnPhoneOrTablet() {

    if (window.screen.width < 800) {

        animateOsc = true;
        oscColor = '#C62B27';

        animateEnvelopes = true;
        envelopeColor = '#49A22E';

        animateFilter = true;
        filterColor = '#464FE9';

        animateEffects = true;
        effectsColor = '#B49F31';
    }
}