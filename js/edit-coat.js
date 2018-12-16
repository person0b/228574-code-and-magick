'use strict';

(function () {
  var Selector = {
    INPUT: '[name="coat-color"]',
    PREVIEW: '.setup-wizard .wizard-coat'
  };
  var COLORS = window.data.coatColors;

  var dialog = window.data.dialog;
  var inputCoatColor = dialog.querySelector(Selector.INPUT);
  var previewCoat = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onCoatClick = function () {
    previewCoat.style.fill = COLORS[selectedColors];
    inputCoatColor.value = COLORS[selectedColors];
    window.sortSimilarWizards.onCoatChange(COLORS[selectedColors]);
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editCoat = {
    coat: previewCoat,
    color: inputCoatColor.value,
    onCoatClick: onCoatClick
  };
})();
