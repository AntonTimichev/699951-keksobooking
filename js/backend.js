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
        onError(xhr.status);
      }
    }

    function onDataLoadError() {
      onError(xhr.status);
    }

    function onDataLoadTimeOut() {
      onError(xhr.status);
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
        onError(xhr.status);
      }
    }
  }
  window.backend = {
    upLoadForm: upLoadForm,
    loadData: loadData
  };
})();

