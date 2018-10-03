'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(obj, id) {
    var pinElement = templatePin.cloneNode(true);
    pinElement.dataset.id = id;
    pinElement.style.top = obj.location.y + 'px';
    pinElement.style.left = obj.location.x + 'px';
    pinElement.querySelector('img').src = obj.author.avatar;
    pinElement.querySelector('img').alt = obj.offer.title;
    return pinElement;
  }

  function createPinElements(array) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var pin = renderPin(array[i], i);
      fragmentPins.appendChild(pin);
    }
    return fragmentPins;
  }

  function getPinsLoadedOffers() {
    return document.querySelectorAll('.map__pin:not(.map__pin--main)');
  }

  function removePins() {
    var pins = getPinsLoadedOffers();
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  function addPins(array, container) {
    var newPin = createPinElements(array);
    return container.appendChild(newPin);
  }
  window.pins = {
    add: addPins,
    remove: removePins
  };
})();
