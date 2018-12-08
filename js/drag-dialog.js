'use strict';

(function () {
  var Selectors = {
    HANDLE: '.upload'
  };

  var dialog = window.data.dialog;
  var handle = dialog.querySelector(Selectors.HANDLE);

  var defaultDialogCoords = {
    x: dialog.style.left,
    y: dialog.style.top
  };

  var onHandleMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (shift.x > 1 || shift.x < -1 || shift.y > 1 || shift.y < -1) {
        dragged = true;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          handle.removeEventListener('click', onClickPreventDefault);
        };
        handle.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetDialogPosition = function () {
    dialog.style.top = defaultDialogCoords.y;
    dialog.style.left = defaultDialogCoords.x;
  };

  window.dragDialog = {
    handle: handle,
    onHandleMousedown: onHandleMousedown,
    resetDialogPosition: resetDialogPosition
  };
})();
