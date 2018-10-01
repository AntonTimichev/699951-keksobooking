'use strict';

(function () {
  function loadData(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', onDataLoad);
    xhr.addEventListener('error', onDataLoadError);
    xhr.addEventListener('timeout', onDataLoadTimeOut);
    xhr.timeout = 10000;
    xhr.open('GET', window.const.URL_LOAD);
    xhr.send();

    function onDataLoad() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        var errMessage = 'Ошибка загрузки данных с сервера: ' + xhr.status;
        onError(errMessage);
      }
    }

    function onDataLoadError() {
      var errMessage = 'Ошибка загрузки данных с сервера: ' + xhr.status + ' проверьте интернет-соединение';
      onError(errMessage);
    }

    function onDataLoadTimeOut() {
      var errMessage = 'Данные не успели загрузиться с сервера: ' + xhr.status;
      onError(errMessage);
    }
  }

  function upLoadForm(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', onFormLoad);
    xhr.open('POST', window.const.URL_UPLOAD);
    xhr.send(data);

    function onFormLoad() {
      if (xhr.status === 200) {
        onLoad();
      } else {
        var errMessage = 'Ошибка загрузки объявления: ' + xhr.status;
        onError(errMessage);
      }
    }
  }
  window.backend = {
    upLoadForm: upLoadForm,
    loadData: loadData
  };
})();

