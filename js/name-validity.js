'use strict';

(function () {
  var Parameter = {
    MIN: 2,
    MAX: 25
  };
  var Alert = {
    SMALL: 'Имя должно состоять минимум из ' + Parameter.MIN + ' символов',
    BIGGER: 'Имя не должно быть длиннее ' + Parameter.MAX + ' символов'
  };

  var onNameInput = function (evt) {
    var target = evt.target;
    if (target.value.length < Parameter.MIN) {
      target.setCustomValidity(Alert.SMALL);
    } else if (target.value.length > Parameter.MAX) {
      target.setCustomValidity(Alert.BIGGER);
    } else {
      target.setCustomValidity('');
    }
  };

  window.nameValidity = {
    onNameInput: onNameInput
  };
})();
