'use strict';

(function () {
  var loadOffers = [];
  var main = document.querySelector('main');
  var successBlock = getSuccessBlock();
  var errorBlock = getErrorBlock();

  function getErrorBlock() {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    return templateError.cloneNode(true);
  }

  function getSuccessBlock() {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    return templateSuccess.cloneNode(true);
  }

  function onLoadError(err) {
    errorBlock.querySelector('.error__message').textContent = 'Ошибка загрузки объявления:' + err;
    showErrorMessage();
  }

  function onSuccess() {
    showSuccessMassage();
  }

  function showErrorMessage() {
    main.appendChild(errorBlock);
    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);
  }

  function showSuccessMassage() {
    main.appendChild(successBlock);
    document.addEventListener('keydown', onSuccesMessageEscPress);
    document.addEventListener('click', onSuccesMessageClick);
  }

  function onErrorMessageEscPress() {
    hideErrorMassage();
  }

  function onErrorMessageClick() {
    hideErrorMassage();
  }

  function onSuccesMessageClick() {
    hideSuccessMassage();
  }

  function onSuccesMessageEscPress(evt) {
    if (evt.which === window.const.ESC_KEYCODE) {
      hideSuccessMassage();
    }
  }

  function hideSuccessMassage() {
    successBlock.remove();
    document.removeEventListener('keydown', onSuccesMessageEscPress);
    document.removeEventListener('click', onSuccesMessageEscPress);
  }

  function hideErrorMassage() {
    errorBlock.remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);
  }

  function getLoadOffers(data) {
    for (var i = 0; i < data.length; i++) {
      loadOffers.push(data[i]);
    }
    return loadOffers;
  }
  window.query = {
    onLoadError: onLoadError,
    onSuccess: onSuccess,
    loadOffers: loadOffers,
    getLoadOffers: getLoadOffers
  };
})();

