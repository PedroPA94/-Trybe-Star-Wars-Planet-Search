import React from 'react';
import film from '../film';

// adapted from: http://www.asciimation.co.nz/
function Movie() {
  const LINES_PER_FRAME = 14;
  const DELAY_NORMAL = 67;

  let gCurrentFrame = 0;
  let gUpdateDelay = DELAY_NORMAL;
  let gFrameStep = 1; // advance one frame per tick
  let gTimerHandle = null;

  function validateFrame(frameNumber) {
    return (frameNumber > 0 && frameNumber < Math.floor(film.length / LINES_PER_FRAME));
  }

  function displayFrame(frameNumber) {
    if (validateFrame(frameNumber) !== true) { return; }

    const screen = document.getElementById('screen');

    while (screen.firstChild) { screen.removeChild(screen.firstChild); }

    for (let line = 1; line < LINES_PER_FRAME; line += 1) {
      let lineText = film[(gCurrentFrame * LINES_PER_FRAME) + line];
      if (!lineText || lineText.length < 1) { lineText = ' '; }

      const div = document.createElement('div');
      div.style.whiteSpace = 'pre';
      div.appendChild(document.createTextNode(lineText));

      screen.appendChild(div);
    }
  }

  function updateDisplay() {
    if (gTimerHandle) { clearTimeout(gTimerHandle); }

    displayFrame(gCurrentFrame);

    if (gFrameStep !== 0) {
    // read the first line of the current frame as it is a number containing how many times this frame should be displayed
      const nextFrameDelay = film[gCurrentFrame * LINES_PER_FRAME] * gUpdateDelay;

      const nextFrame = gCurrentFrame + gFrameStep;

      if (validateFrame(nextFrame) === true) { gCurrentFrame = nextFrame; }

      gTimerHandle = setTimeout(updateDisplay, nextFrameDelay);
    }
  }

  function Play() {
    gFrameStep = 1;
    gUpdateDelay = DELAY_NORMAL;
    updateDisplay();
  }

  window.onload = () => Play();

  return (
    <pre id="screen">
      Teste
    </pre>
  );
}

export default Movie;
