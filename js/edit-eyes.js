'use strict';

(function () {
  var Selector = {
    INPUT: '[name="eyes-color"]',
    PREVIEW: '.setup-wizard .wizard-eyes'
  };
  var COLORS = window.data.eyesColors;

  var dialog = window.data.dialog;
  var inputEyesColor = dialog.querySelector(Selector.INPUT);
  var previewEyes = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onEyesClick = function () {
    previewEyes.style.fill = COLORS[selectedColors];
    inputEyesColor.value = COLORS[selectedColors];
    window.sortSimilarWizards.onEyesChange(COLORS[selectedColors]);
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editEyes = {
    eyes: previewEyes,
    color: inputEyesColor.value,
    onEyesClick: onEyesClick
  };
})();
