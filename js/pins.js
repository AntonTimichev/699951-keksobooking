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
  /*
  function removePins() {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }*/

  function removePinActive() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('map__pin--active')) {
        pins[i].classList.remove('map__pin--active');
      }
    }
  }

  function addPins(array, container) {
    var newPin = createPinElements(array);
    return container.appendChild(newPin);
  }
  window.pins = {
    addPins: addPins,
    removePinActive: removePinActive
  };
})();
