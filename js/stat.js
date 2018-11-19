'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_GAP = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_YOUR_COLOR = 'rgba(255, 0, 0, 1)';
var FONT = '16px PT Mono';
var BASELINE = 'hanging';
var FONT_GAP = 16;
var TEXT = ['Ура вы победили!', 'Список результатов:'];
var TEXT_COLOR = '#000';


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var renderCloud = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_GAP);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH - CLOUD_GAP, y + CLOUD_HEIGHT / 2);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - CLOUD_GAP);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_GAP, y + CLOUD_HEIGHT / 2);
    ctx.lineTo(x, y);
    ctx.fill();
  };

  var getBarX = function (multiplier) {
    return CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * multiplier;
  };

  var getBarColor = function (player) {
    return player === 'Вы' ? BAR_YOUR_COLOR : 'hsl(230, ' + (Math.random() * 100).toString() + '%, 50%)';
  };

  renderCloud(CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, SHADOW_COLOR);
  renderCloud(CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.font = FONT;
  ctx.textBaseline = BASELINE;

  for (var i = 0; i < TEXT.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(TEXT[i], CLOUD_X + CLOUD_GAP * 2, CLOUD_Y + CLOUD_GAP * 1.5 + FONT_GAP * i);
  }

  for (var t = 0; t < times.length; t++) {
    times[t] = Math.round(times[t]);
  }

  var maxTime = getMaxElement(times);

  for (var p = 0; p < names.length; p++) {
    if (names[p] !== undefined || times[p] !== undefined) {
      var barHeight = (BAR_HEIGHT * times[p]) / maxTime;
      var nameY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 1.5 - FONT_GAP;
      var timeY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 3 - FONT_GAP * 2 - barHeight;
      var barY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 2 - FONT_GAP - barHeight;

      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(names[p], getBarX(p), nameY);
      ctx.fillText(times[p], getBarX(p), timeY);
      ctx.fillStyle = getBarColor(names[p]);
      ctx.fillRect(getBarX(p), barY, BAR_WIDTH, barHeight);
    }
  }
};
