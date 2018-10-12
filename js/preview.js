'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var preview = document.querySelector('.ad-form-header__avatar');
  var box = document.querySelector('.ad-form__photo-container');

  function checkFormat(file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  }

  function changePhotoField(bool) {
    var photoContainer = document.querySelectorAll('.ad-form__photo');
    photoContainer.forEach(function (container) {
      if (photoContainer) {
        container.remove();
      }
    });
    if (bool) {
      var defaultContainer = createPhotoContainer();
      defaultContainer.draggable = false;
      box.appendChild(defaultContainer);
    }
  }

  function createPhotoContainer() {
    var newElement = document.createElement('div');
    newElement.classList.add('ad-form__photo');
    newElement.draggable = true;
    return newElement;
  }

  function createNewPicture(reader) {
    var newElement = document.createElement('img');
    newElement.setAttribute('width', '70');
    newElement.setAttribute('height', '70');
    newElement.src = reader.result;
    newElement.alt = 'фото жилья';
    return newElement;
  }

  function getDownloadFile(reader) {
    var container = createPhotoContainer();
    var picture = createNewPicture(reader);
    container.appendChild(picture);
    return container;
  }

  window.review = {
    showAvatar: function (file) {
      var matches = checkFormat(file);

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    },
    removeAvatar: function () {
      preview.src = 'img/muffin-grey.svg';
    },
    showImages: function (files) {
      var fragmentPictures = document.createDocumentFragment();
      changePhotoField(false);
      Array.prototype.forEach.call(files, function (file, i) {
        var matches = checkFormat(file);

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            var newFile = getDownloadFile(reader);
            fragmentPictures.appendChild(newFile);
            if (i === files.length - 1) {
              box.appendChild(fragmentPictures);
              window.dragndrop(box);
            }
          });
          reader.readAsDataURL(file);
        }
      });
    },
    removeImages: function () {
      changePhotoField(true);
    }
  };
})();
/*
showImages: function (fileField) {
  var fragmentPictures = document.createDocumentFragment();
  changePhotoField(false);
  Array.prototype.forEach.call(fileField.files, function (file, i) {
    var matches = checkFormat(file);

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newFile = getDownloadFile(reader);
        fragmentPictures.appendChild(newFile);
        if (i === fileField.files.length - 1) {
          box.appendChild(fragmentPictures);
        }
      });
      reader.readAsDataURL(file);
    }
  });
}
*/
