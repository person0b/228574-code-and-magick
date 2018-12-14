'use strict';

(function () {
  var Selector = {
    INPUT: '[name="fireball-color"]',
    PREVIEW: '.setup-fireball-wrap'
  };
  var COLORS = window.data.fireballColors;

  var dialog = window.data.dialog;
  var input = dialog.querySelector(Selector.INPUT);
  var preview = dialog.querySelector(Selector.PREVIEW);
  var selectedColors = 1;

  var onFireballClick = function () {
    preview.style.background = COLORS[selectedColors];
    input.value = COLORS[selectedColors];
    selectedColors = (selectedColors + 1) % COLORS.length;
  };

  window.editFireball = {
    fireball: preview,
    color: input.value,
    onFireballClick: onFireballClick
  };
})();
