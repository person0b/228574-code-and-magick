'use strict';

(function () {
  var ClassName = {
    HIDDEN: 'hidden'
  };
  var DEBOUNCE_INTERVAL = 500;

  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomFromInterval(0, arr.length)];
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    classNames: ClassName,
    getRandomElement: getRandomElement,
    debounce: debounce
  };
})();
