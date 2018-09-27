'use strict';

(function () {
  var filterFormItems = document.querySelectorAll('.map__filters > *');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldSets = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var price = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var selectRoom = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var submit = adForm.querySelector('.ad-form__submit');
  var fields = adForm.querySelectorAll('fieldset > input, select');
  var PriceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  setMinPrice(selectType.value);
  changeAvailabilityFields(filterFormItems);
  changeAvailabilityFields(adFormFieldSets);

  adForm.addEventListener('input', onElementInput);
  submit.addEventListener('click', onSubmitClick);
  selectTimeIn.addEventListener('change', onSelectTimeChange);
  selectTimeOut.addEventListener('change', onSelectTimeChange);
  selectType.addEventListener('change', onSelectTypeChange);

  function onElementInput(evt) {
    var field = evt.target;
    unMarkValidFields(field);
  }

  function onSelectTypeChange() {
    setMinPrice(selectType.value);
  }

  function onSelectTimeChange(evt) {
    var newSelect = evt.target;
    setTimeInOut(newSelect);
  }

  function onSubmitClick() {
    checkCapacity();
    markInvalidFields();
  }

  function checkCapacity() {
    var capacity = +selectCapacity.value;
    var roomNumber = +selectRoom.value;
    var message = null;
    if (roomNumber !== 100 && (capacity > roomNumber || capacity < 1)) {
      message = 'Количество гостей НЕ должно быть больше ' + roomNumber + ' и меньше 1';
    } else if (roomNumber === 100 && capacity !== 0) {
      message = 'Поставьте пункт \<не для гостей\> в поле <Количество мест>';
    } else {
      message = '';
    }
    selectCapacity.setCustomValidity(message);
  }

  function setTimeInOut(newSelect) {
    selectTimeIn.value = newSelect.value;
    selectTimeOut.value = newSelect.value;
  }

  function setMinPrice(typeValue) {
    price.min = PriceOfType[typeValue];
    price.placeholder = PriceOfType[typeValue];
  }

  function unMarkValidFields(field) {
    var hasFieldRemovedClass = field.classList.contains('field-invalid');
    if (hasFieldRemovedClass) {
      field.classList.remove('field-invalid');
    }
  }

  function markInvalidFields() {
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (!field.validity.valid) {
        field.classList.add('field-invalid');
      }
    }
  }

  function setAddress(coords) {
    address.value = coords.x + ', ' + coords.y;
  }

  function isFormDisabled() {
    return adForm.classList.contains('ad-form--disabled');
  }

  function changeAvailabilityFields(formFields) {
    var disable = isFormDisabled();
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = disable;
    }
  }
  window.form = {
    adForm: adForm,
    adFormFieldSets: adFormFieldSets,
    filterFormItems: filterFormItems,
    setAddress: setAddress,
    changeAvailabilityFields: changeAvailabilityFields
  };
})();