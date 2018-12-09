'use strict';

(function () {
  var Selectors = {
    INPUT: '[name="coat-color"]',
    PREVIEW: '.setup-wizard .wizard-coat'
  };
  var COLORS = window.data.coatColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selectors.INPUT);
  var preview = dialog.querySelector(Selectors.PREVIEW);
  var selectedColors = 1;

  var onCoatClick = function () {
    preview.style.fill = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editCoat = {
    coat: preview,
    onCoatClick: onCoatClick
  };
})();
