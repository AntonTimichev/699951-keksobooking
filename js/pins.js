'use strict';

(function () {
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
  /*
  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }*/

  function addPins(array, container) {
    var newPin = createPinElements(array);
    return container.appendChild(newPin);
  }
  window.pins = addPins;
})();
