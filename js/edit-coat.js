'use strict';

(function () {
  var Selector = {
    INPUT: '[name="coat-color"]',
    PREVIEW: '.setup-wizard .wizard-coat'
  };
  var COLORS = window.data.coatColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selector.INPUT);
  var preview = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onCoatClick = function () {
    preview.style.fill = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    window.sortSimilarWizards.onCoatChange(COLORS[selectedColors]);
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editCoat = {
    coat: preview,
    color: input.value,
    onCoatClick: onCoatClick
  };
})();
