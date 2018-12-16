'use strict';

(function () {
  var CloudParameter = {
    X_POSITION: 100,
    Y_POSITION: 10,
    WIDTH: 420,
    HEIGTH: 270,
    GAP: 10,
    COLOR: '#fff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };

  var BarParameter = {
    WIDTH: 40,
    HEIGTH: 150,
    GAP: 50
  };

  var TextParameter = {
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
      ctx.lineTo(x + CloudParameter.WIDTH / 2, y + CloudParameter.GAP);
      ctx.lineTo(x + CloudParameter.WIDTH, y);
      ctx.lineTo(x + CloudParameter.WIDTH - CloudParameter.GAP, y + CloudParameter.HEIGTH / 2);
      ctx.lineTo(x + CloudParameter.WIDTH, y + CloudParameter.HEIGTH);
      ctx.lineTo(x + CloudParameter.WIDTH / 2, y + CloudParameter.HEIGTH - CloudParameter.GAP);
      ctx.lineTo(x, y + CloudParameter.HEIGTH);
      ctx.lineTo(x + CloudParameter.GAP, y + CloudParameter.HEIGTH / 2);
      ctx.lineTo(x, y);
      ctx.fill();
    };

    var getBarX = function (multiplier) {
      return CloudParameter.X_POSITION + BarParameter.GAP + (BarParameter.WIDTH + BarParameter.GAP) * multiplier;
    };

    var getBarColor = function (player) {
      return player === CurrentPlayer.NAME ? CurrentPlayer.COLOR : 'hsl(230, ' + (Math.random() * 100).toString() + '%, 50%)';
    };

    renderCloud(CloudParameter.X_POSITION + CloudParameter.GAP, CloudParameter.Y_POSITION + CloudParameter.GAP, CloudParameter.SHADOW_COLOR);
    renderCloud(CloudParameter.X_POSITION, CloudParameter.Y_POSITION, CloudParameter.COLOR);

    ctx.font = TextParameter.FONT;
    ctx.textBaseline = TextParameter.BASELINE;

    for (var i = 0; i < TextParameter.HEAD_STRINGS.length; i++) {
      ctx.fillStyle = TextParameter.COLOR;
      ctx.fillText(TextParameter.HEAD_STRINGS[i], CloudParameter.X_POSITION + CloudParameter.GAP * 2, CloudParameter.Y_POSITION + CloudParameter.GAP * 1.5 + TextParameter.GAP * i);
    }

    for (var t = 0; t < times.length; t++) {
      times[t] = Math.round(times[t]);
    }

    var maxTime = getMaxElement(times);

    for (var p = 0; p < names.length; p++) {
      if (names[p] !== undefined || times[p] !== undefined) {
        var barHeight = (BarParameter.HEIGTH * times[p]) / maxTime;
        var nameY = CloudParameter.Y_POSITION + CloudParameter.HEIGTH - CloudParameter.GAP * 1.5 - TextParameter.GAP;
        var timeY = CloudParameter.Y_POSITION + CloudParameter.HEIGTH - CloudParameter.GAP * 3 - TextParameter.GAP * 2 - barHeight;
        var barY = CloudParameter.Y_POSITION + CloudParameter.HEIGTH - CloudParameter.GAP * 2 - TextParameter.GAP - barHeight;

        ctx.fillStyle = TextParameter.COLOR;
        ctx.fillText(names[p], getBarX(p), nameY);
        ctx.fillText(times[p], getBarX(p), timeY);
        ctx.fillStyle = getBarColor(names[p]);
        ctx.fillRect(getBarX(p), barY, BarParameter.WIDTH, barHeight);
      }
    }
  };
})();
