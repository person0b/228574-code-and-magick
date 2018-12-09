'use strict';

(function () {
  var Selectors = {
    INPUT: '[name="fireball-color"]',
    PREVIEW: '.setup-fireball-wrap'
  };
  var COLORS = window.data.fireballColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selectors.INPUT);
  var preview = dialog.querySelector(Selectors.PREVIEW);
  var selectedColors = 1;

  var onFireballClick = function () {
    preview.style.background = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editFireball = {
    fireball: preview,
    onFireballClick: onFireballClick
  };
})();
