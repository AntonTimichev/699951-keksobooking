'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinContainer = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var startCoords = {};
  var limits = {
    top: 130,
    left: 1,
    right: 1135,
    bottom: 630
  };
  var firstCoords = getAddress(mapPinMain);

  window.form.setAddress(firstCoords);

  map.addEventListener('click', onMapClick);
  mapPinMain.addEventListener('mouseup', onPinMainMouseUp);
  mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

  function onMapClick(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      window.pins.removePinActive();
      pin.classList.add('map__pin--active');
      var id = pin.dataset.id;
      var data = window.query.loadOffers[id];
      window.card.close();
      window.card.open(data, map);
    }
  }

  function onPinMainMouseDown(evt) {
    document.addEventListener('mousemove', onDocumentMouseMove);
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
  }

  function onDocumentMouseMove(evt) {
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var newCoords = calculateNewCoords(shift);
    setCoords(newCoords);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }

  function calculateNewCoords(shift) {
    var newCoords = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };
    if (newCoords.x > limits.right) {
      newCoords.x = limits.right;
    }
    if (newCoords.x < limits.left) {
      newCoords.x = limits.left;
    }
    if (newCoords.y > limits.bottom) {
      newCoords.y = limits.bottom;
    }
    if (newCoords.y < limits.top) {
      newCoords.y = limits.top;
    }
    return newCoords;
  }

  function setCoords(coords) {
    mapPinMain.style.left = coords.x + 'px';
    mapPinMain.style.top = coords.y + 'px';
  }

  function onDocumentMouseUp() {
    var addressCoords = getAddress(mapPinMain);
    window.form.setAddress(addressCoords);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  function onPinMainMouseUp() {
    activatePage();
    window.backend.loadData(window.query.getLoadOffers, window.query.onLoadError);
    window.pins.addPins(window.query.loadOffers, pinContainer);
    var disabledAddressCoords = getAddress(mapPinMain);
    window.form.setAddress(disabledAddressCoords);
    mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  function activatePage() {
    map.classList.remove('map--faded');
    window.form.enable();
  }
  /*
  function deactivatePage() {
    map.classList.add('map--faded');
    window.form.disable();
  }*/

  function getAddress(elem) {
    var pinLeft = elem.style.left;
    var pinTop = elem.style.top;
    var x = parseInt(pinLeft, 10) + Math.round(elem.clientWidth / 2);
    var y = parseInt(pinTop, 10) + Math.round(elem.clientHeight + window.const.HIEGHT_PIN);
    if (map.classList.contains('map--faded')) {
      y = parseInt(pinTop, 10) + Math.round(elem.clientHeight / 2);
    }
    return {x: x, y: y};
  }
})();
