'use strict';

(function () {
  var dropBoxImages = document.querySelector('.ad-form__drop-zone');
  var dropBoxAvatar = document.querySelector('.ad-form-header__drop-zone');

  dropBoxImages.addEventListener('dragenter', onInputDragenter);
  dropBoxImages.addEventListener('dragover', onInputDragover);
  dropBoxImages.addEventListener('drop', onInputImagesDrop);
  dropBoxAvatar.addEventListener('dragenter', onInputDragenter);
  dropBoxAvatar.addEventListener('dragover', onInputDragover);
  dropBoxAvatar.addEventListener('drop', onInputAvatarDrop);

  function onInputDragenter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function onInputDragover(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function onInputImagesDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    window.review.showImages(files);
  }

  function onInputAvatarDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    window.review.showAvatar(file);
  }

  window.dragndrop = function (rootElement) {
    var dragElement = null;

    function onBoxDragover(evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target.closest('.ad-form__photo');
      if (target && target !== dragElement) {
        if (target === rootElement.children[1]) {
          rootElement.insertBefore(dragElement, target);
        } else if (target === rootElement.lastChild) {
          rootElement.appendChild(dragElement);
        } else {
          rootElement.insertBefore(dragElement, target.nextSibling);
        }
      }
    }

    function onBoxDragEnd(evt) {
      evt.preventDefault();
      rootElement.removeEventListener('dragover', onBoxDragover);
      rootElement.removeEventListener('dragend', onBoxDragEnd);
    }

    rootElement.addEventListener('dragstart', function (evt) {
      dragElement = evt.target.closest('.ad-form__photo');

      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/uri-list', URL);
      evt.dataTransfer.setData('text/plain', URL);

      rootElement.addEventListener('dragover', onBoxDragover);
      rootElement.addEventListener('dragend', onBoxDragEnd);
    });
  };
})();

