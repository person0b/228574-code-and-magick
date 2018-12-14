'use strict';

(function () {
  var Selector = {
    INPUT: '[name="eyes-color"]',
    PREVIEW: '.setup-wizard .wizard-eyes'
  };
  var COLORS = window.data.eyesColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selector.INPUT);
  var preview = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onEyesClick = function () {
    preview.style.fill = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    window.sortSimilarWizards.onEyesChange(COLORS[selectedColors]);
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editEyes = {
    eyes: preview,
    color: input.value,
    onEyesClick: onEyesClick
  };
})();
