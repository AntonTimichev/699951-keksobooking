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

  function addPins(array, container) {
    var newPin = createPinElements(array);
    return container.appendChild(newPin);
  }

  function onPinClick(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var id = pin.dataset.id;
      var data = window.data.offers[id];
      window.card.closeCard();
      window.card.openCard(data, window.map.map);
    }
  }
  window.pins = {
    addPins: addPins,
    onPinClick: onPinClick
  };
})();
