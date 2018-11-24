'use strict';

var CloudParameters = {
  X_POSITION: 100,
  Y_POSITION: 10,
  WIDTH: 420,
  HEIGTH: 270,
  GAP: 10,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var BarParameters = {
  WIDTH: 40,
  HEIGTH: 150,
  GAP: 50
};

var TextParameters = {
  FONT: '16px PT Mono',
  BASELINE: 'hanging',
  GAP: 16,
  COLOR: '#000',
  HEAD_STRINGS: ['Ура вы победили!', 'Список результатов:']
};

var CurrentPlayer = {
  NAME: 'Вы',
  COLOR: 'rgba(255, 0, 0, 1)'
};

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
    ctx.lineTo(x + CloudParameters.WIDTH / 2, y + CloudParameters.GAP);
    ctx.lineTo(x + CloudParameters.WIDTH, y);
    ctx.lineTo(x + CloudParameters.WIDTH - CloudParameters.GAP, y + CloudParameters.HEIGTH / 2);
    ctx.lineTo(x + CloudParameters.WIDTH, y + CloudParameters.HEIGTH);
    ctx.lineTo(x + CloudParameters.WIDTH / 2, y + CloudParameters.HEIGTH - CloudParameters.GAP);
    ctx.lineTo(x, y + CloudParameters.HEIGTH);
    ctx.lineTo(x + CloudParameters.GAP, y + CloudParameters.HEIGTH / 2);
    ctx.lineTo(x, y);
    ctx.fill();
  };

  var getBarX = function (multiplier) {
    return CloudParameters.X_POSITION + BarParameters.GAP + (BarParameters.WIDTH + BarParameters.GAP) * multiplier;
  };

  var getBarColor = function (player) {
    return player === CurrentPlayer.NAME ? CurrentPlayer.COLOR : 'hsl(230, ' + (Math.random() * 100).toString() + '%, 50%)';
  };

  renderCloud(CloudParameters.X_POSITION + CloudParameters.GAP, CloudParameters.Y_POSITION + CloudParameters.GAP, CloudParameters.SHADOW_COLOR);
  renderCloud(CloudParameters.X_POSITION, CloudParameters.Y_POSITION, CloudParameters.COLOR);

  ctx.font = TextParameters.FONT;
  ctx.textBaseline = TextParameters.BASELINE;

  for (var i = 0; i < TextParameters.HEAD_STRINGS.length; i++) {
    ctx.fillStyle = TextParameters.COLOR;
    ctx.fillText(TextParameters.HEAD_STRINGS[i], CloudParameters.X_POSITION + CloudParameters.GAP * 2, CloudParameters.Y_POSITION + CloudParameters.GAP * 1.5 + TextParameters.GAP * i);
  }

  for (var t = 0; t < times.length; t++) {
    times[t] = Math.round(times[t]);
  }

  var maxTime = getMaxElement(times);

  for (var p = 0; p < names.length; p++) {
    if (names[p] !== undefined || times[p] !== undefined) {
      var barHeight = (BarParameters.HEIGTH * times[p]) / maxTime;
      var nameY = CloudParameters.Y_POSITION + CloudParameters.HEIGTH - CloudParameters.GAP * 1.5 - TextParameters.GAP;
      var timeY = CloudParameters.Y_POSITION + CloudParameters.HEIGTH - CloudParameters.GAP * 3 - TextParameters.GAP * 2 - barHeight;
      var barY = CloudParameters.Y_POSITION + CloudParameters.HEIGTH - CloudParameters.GAP * 2 - TextParameters.GAP - barHeight;

      ctx.fillStyle = TextParameters.COLOR;
      ctx.fillText(names[p], getBarX(p), nameY);
      ctx.fillText(times[p], getBarX(p), timeY);
      ctx.fillStyle = getBarColor(names[p]);
      ctx.fillRect(getBarX(p), barY, BarParameters.WIDTH, barHeight);
    }
  }
};
