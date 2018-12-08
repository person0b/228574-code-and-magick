'use strict';

(function () {
  var Selectors = {
    OPEN_BUTTON: '.setup-open',
    CLOSE_BUTTON: '.setup-close',
    NAME_INPUT: '.setup-user-name'
  };
  var ClassNames = {
    HIDDEN: 'hidden'
  };
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var dialog = window.data.dialog;
  var openButton = document.querySelector(Selectors.OPEN_BUTTON);
  var closeButton = dialog.querySelector(Selectors.CLOSE_BUTTON);
  var dialogHandle = window.dragDialog.handle;
  var nameInput = dialog.querySelector(Selectors.NAME_INPUT);
  var coat = window.editCoat.coat;
  var eyes = window.editEyes.eyes;
  var fireball = window.editFireball.fireball;

  var openDialog = function () {
    dialog.classList.remove(ClassNames.HIDDEN);

    document.addEventListener('keydown', onDialogEscPress);
    closeButton.addEventListener('click', closeDialog);
    closeButton.addEventListener('keydown', onCloseButtonEnterPress);
    dialogHandle.addEventListener('mousedown', window.dragDialog.onHandleMousedown);
    coat.addEventListener('click', window.editCoat.onCoatClick);
    eyes.addEventListener('click', window.editEyes.onEyesClick);
    fireball.addEventListener('click', window.editFireball.onFireballClick);
    nameInput.addEventListener('input', window.nameValidity.onNameInput);
  };

  var closeDialog = function () {
    dialog.classList.add(ClassNames.HIDDEN);
    window.dragDialog.resetDialogPosition();

    document.removeEventListener('keydown', onDialogEscPress);
    closeButton.removeEventListener('click', closeDialog);
    closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
    dialogHandle.removeEventListener('mousedown', window.dragDialog.onHandleMousedown);
    coat.removeEventListener('click', window.editCoat.onCoatClick);
    eyes.removeEventListener('click', window.editEyes.onEyesClick);
    fireball.removeEventListener('click', window.editFireball.onFireballClick);
    nameInput.removeEventListener('input', window.nameValidity.onNameInput);
  };

  var onDialogEscPress = function (evt) {
    if (evt.keyCode === KeyCodes.ESC && document.activeElement !== nameInput) {
      closeDialog();
    }
  };

  var onOpenButtonEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      openDialog();
    }
  };

  var onCloseButtonEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      closeDialog();
    }
  };

  openButton.addEventListener('click', openDialog);
  openButton.addEventListener('keydown', onOpenButtonEnterPress);
})();
