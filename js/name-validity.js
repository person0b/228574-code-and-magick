'use strict';

(function () {
  var Parameters = {
    MIN: 2,
    MAX: 25
  };
  var Alert = {
    SMALL: 'Имя должно состоять минимум из ' + Parameters.MIN + ' символов',
    BIGGER: 'Имя не должно быть длиннее ' + Parameters.MAX + ' символов'
  };

  var onNameInput = function (evt) {
    var target = evt.target;
    if (target.value.length < Parameters.MIN) {
      target.setCustomValidity(Alert.SMALL);
    } else if (target.value.length > Parameters.MAX) {
      target.setCustomValidity(Alert.BIGGER);
    } else {
      target.setCustomValidity('');
    }
  };

  window.nameValidity = {
    onNameInput: onNameInput
  };
})();
