'use strict';

(function () {
  var Selectors = {
    INPUT: '[name="eyes-color"]',
    PREVIEW: '.setup-wizard .wizard-eyes'
  };
  var COLORS = window.data.eyesColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selectors.INPUT);
  var preview = dialog.querySelector(Selectors.PREVIEW);
  var selectedColors = 1;

  var onEyesClick = function () {
    preview.style.fill = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editEyes = {
    eyes: preview,
    onEyesClick: onEyesClick
  };
})();
