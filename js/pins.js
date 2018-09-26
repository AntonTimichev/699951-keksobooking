'use strict';

(function () {
  /* СОЗДАНИЕ ПИНА */
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(obj) {
    var pinElement = templatePin.cloneNode(true);
    pinElement.dataset.id = obj.id;
    pinElement.style.top = obj.location.y + 'px';
    pinElement.style.left = obj.location.x + 'px';
    pinElement.querySelector('img').src = obj.author.avatar;
    pinElement.querySelector('img').alt = obj.offer.title;
    return pinElement;
  }

  function createPinElements(array) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var pin = renderPin(array[i]);
      fragmentPins.appendChild(pin);
    }
    return fragmentPins;
  }

  function addPins(array) {
    var mapPins = document.querySelector('.map__pins');
    var newPin = createPinElements(array);
    return mapPins.appendChild(newPin);
  }
  window.pins = {
    addPins: addPins
  };
})();
