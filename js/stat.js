'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIGTH = 420;
var CLOUD_GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIGTH / 2, y + CLOUD_GAP);
  ctx.lineTo(x + CLOUD_WIGTH, y);
  ctx.lineTo(x + CLOUD_WIGTH - CLOUD_GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIGTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIGTH / 2, y + CLOUD_HEIGHT - CLOUD_GAP);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.fill();
};

var getMaxElements = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  for (var i = 0; i < TEXT.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(TEXT[i], CLOUD_X + CLOUD_GAP * 2, CLOUD_Y + CLOUD_GAP * 1.5 + FONT_GAP * i);
  }

  for (var t = 0; t < times.length; t++) {
    times[t] = Math.round(times[t]);
  }

  var maxTime = Math.round(getMaxElements(times));

  for (var p = 0; p < names.length; p++) {
    if (names[p] !== undefined || times[p] !== undefined) {
      var thisBarHeight = (BAR_HEIGHT * times[p]) / maxTime;

      ctx.fillText(names[p], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * p, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 1.5 - FONT_GAP);
      ctx.fillText(times[p], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * p, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 3 - FONT_GAP * 2 - thisBarHeight);

      if (names[p] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(230, ' + (Math.random() * 100).toString() + '%, 50%)';
      }

      ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * p, CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 2 - FONT_GAP - thisBarHeight, BAR_WIDTH, thisBarHeight);

      ctx.fillStyle = '#000';
    }
  }
};
