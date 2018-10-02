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
  var defaultCoords = {
    x: 570,
    y: 375
  };
  var loadedOffers = [];

  writeAddress();

  map.addEventListener('click', onMapClick);
  mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

  function onMapClick(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      window.pins.removeActiveStatus();
      pin.classList.add('map__pin--active');
      var id = pin.dataset.id;
      var data = loadedOffers[id];
      window.card.close();
      window.card.open(data, map);
    }
  }

  function onPinMainMouseDown(evt) {
    if (map.classList.contains('map--faded')) {
      mapPinMain.addEventListener('mouseup', onPinMainMouseUp);
    }
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
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
    writeAddress();
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  }

  function onPinMainMouseUp() {
    window.backend.loadData(function (data) {
      activatePage();
      setLoadedOffers(data);
      window.pins.add(data, pinContainer);
      writeAddress();
      mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }, function (err) {
      window.notice.onLoadError(err);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    });
  }

  function activatePage() {
    map.classList.remove('map--faded');
    window.form.enable();
  }

  function deactivatePage() {
    map.classList.add('map--faded');
    window.pins.remove();
    window.card.close();
    window.form.disable();
    setCoords(defaultCoords);
    writeAddress();
  }

  function writeAddress() {
    var address = getAddress(mapPinMain);
    window.form.setAddress(address);
  }

  function setLoadedOffers(data) {
    for (var i = 0; i < data.length; i++) {
      loadedOffers.push(data[i]);
    }
  }

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
  window.mapDisable = deactivatePage;
})();
