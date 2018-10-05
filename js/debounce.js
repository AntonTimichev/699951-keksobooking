'use strict';

(function () {
  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, window.constant.DEBOUNCE_INTERVAL);
    };
  };
})();
