'use strict';

(function () {
  var HIEGHT_PIN = 20;
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

  map.addEventListener('click', window.pins.onPinClick);
  mapPinMain.addEventListener('mouseup', onPinMainMouseUp);
  mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

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

  function onDocumentMouseUp() {
    var addressCoords = getAddress(mapPinMain);
    window.form.setAddress(addressCoords);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    document.removeEventListener('mousemove', onDocumentMouseMove);
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

  function onPinMainMouseUp() {
    activatePage();
    window.pins.addPins(window.data.offers, pinContainer);
    window.form.changeAvailabilityFields(window.form.adFormFieldSets);
    window.form.changeAvailabilityFields(window.form.filterFormItems);
    var disabledAddressCoords = getAddress(mapPinMain);
    window.form.setAddress(disabledAddressCoords);
    mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  function activatePage() {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
  }

  function getAddress(elem) {
    var pinLeft = elem.style.left;
    var pinTop = elem.style.top;
    var x = parseInt(pinLeft, 10) + Math.round(elem.clientWidth / 2);
    var y = parseInt(pinTop, 10) + Math.round(elem.clientHeight + HIEGHT_PIN);
    if (map.classList.contains('map--faded')) {
      y = parseInt(pinTop, 10) + Math.round(elem.clientHeight / 2);
    }
    return {x: x, y: y};
  }
  window.map = {
    map: map,
    mapPinMain: mapPinMain
  };
})();
