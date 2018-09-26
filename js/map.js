'use strict';

(function () {
  /* MODULE4 - TASK1 */
  var HIEGHT_PIN = 20;
  var ESC_KEYCODE = 27;
  var mapPinMain = window.card.map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldSets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var filterFormItems = mapFilters.querySelectorAll('.map__filters > *');
  var address = adForm.querySelector('#address');
  var firstCoords = getAddress(mapPinMain);

  changeAvailabilityFields(filterFormItems);
  changeAvailabilityFields(adFormFieldSets);
  setAddress(firstCoords);

  window.card.map.addEventListener('click', onPinClick);
  mapPinMain.addEventListener('mouseup', onPinMainMouseUp);

  function onPinClick(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var id = pin.dataset.id;
      var data = window.data.offers[id];
      closeCard();
      window.card.openCard(data);
    }
  }

  function onCloseOfferClick() {
    closeCard();
  }

  function onOfferEscPress(evt) {
    if (evt.which === ESC_KEYCODE) {
      closeCard();
    }
  }

  function onPinMainMouseUp() {
    activatePage();
    window.pins.addPins(window.data.offers);
    changeAvailabilityFields(adFormFieldSets);
    changeAvailabilityFields(filterFormItems);
    var disabledAddressCoords = getAddress(mapPinMain);
    setAddress(disabledAddressCoords);
    mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
    document.removeEventListener('mousemove', window.form.onDocumentMouseMove);
  }

  function closeCard() {
    var card = window.card.map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', onOfferEscPress);
  }

  function changeAvailabilityFields(formFields) {
    var isFormDisabled = isMapDisabled();
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = isFormDisabled;
    }
  }

  function isMapDisabled() {
    return window.card.map.classList.contains('map--faded');
  }

  function activatePage() {
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }

  function setAddress(coords) {
    address.value = coords.x + ', ' + coords.y;
  }

  function getAddress(elem) {
    var pinLeft = elem.style.left;
    var pinTop = elem.style.top;
    var x = parseInt(pinLeft, 10) + Math.round(elem.clientWidth / 2);
    var y = parseInt(pinTop, 10) + Math.round(elem.clientHeight + HIEGHT_PIN);
    if (window.card.map.classList.contains('map--faded')) {
      y = parseInt(pinTop, 10) + Math.round(elem.clientHeight / 2);
    }
    return {x: x, y: y};
  }
  window.map = {
    mapPinMain: mapPinMain,
    adForm: adForm,
    onCloseOfferClick: onCloseOfferClick,
    onOfferEscPress: onOfferEscPress,
    setAddress: setAddress,
    getAddress: getAddress
  };
})();
