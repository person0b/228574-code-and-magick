'use strict';

(function () {
  var ClassNames = {
    HIDDEN: 'hidden'
  };

  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomFromInterval(0, arr.length)];
  };

  window.utils = {
    classNames: ClassNames,
    getRandomElement: getRandomElement
  };
})();
