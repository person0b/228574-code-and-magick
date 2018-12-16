'use strict';

(function () {
  var Selector = {
    INPUT: '[name="fireball-color"]',
    PREVIEW: '.setup-fireball-wrap'
  };
  var COLORS = window.data.fireballColors;

  var dialog = window.data.dialog;
  var inputFireballColor = dialog.querySelector(Selector.INPUT);
  var previewFireball = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onFireballClick = function () {
    previewFireball.style.background = COLORS[selectedColors];
    inputFireballColor.value = COLORS[selectedColors];
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editFireball = {
    fireball: previewFireball,
    color: inputFireballColor.value,
    onFireballClick: onFireballClick
  };
})();
