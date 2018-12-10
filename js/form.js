'use strict';

(function () {
  var Selectors = {
    FORM: '.setup-wizard-form',
    BUTTOM: '.setup-submit'
  };

  var dialog = window.data.dialog;
  var form = dialog.querySelector(Selectors.FORM);
  var button = dialog.querySelector(Selectors.BUTTOM);

  var editButton = function (text, color) {
    button.textContent = text;
    button.style.background = color;
  };

  var onFormSubmit = function (evt) {
    var saveSuccess = function () {
      window.dialog.close();
    };

    var saveError = function (errorMessage) {
      editButton(errorMessage, 'red');
    };

    window.backend.save(new FormData(form), saveSuccess, saveError);
    evt.preventDefault();
  };

  form.addEventListener('submit', onFormSubmit);
})();
