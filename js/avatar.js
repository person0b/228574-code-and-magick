'use strict';

(function () {
  var Selector = {
    INPUT: '.upload input[type=file]',
    PREVIEW: '.setup-user-pic'
  };
  var IMAGE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  var dialog = window.data.dialog;
  var avatarInput = dialog.querySelector(Selector.INPUT);
  var avatarPreview = dialog.querySelector(Selector.PREVIEW);

  var onInputChange = function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();
    var isImage = IMAGE_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isImage) {
      var reader = new FileReader();
      var onImageLoad = function () {
        avatarPreview.src = reader.result;
      };

      reader.addEventListener('load', onImageLoad);
      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', onInputChange);
})();
