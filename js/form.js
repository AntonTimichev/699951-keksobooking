'use strict';

(function () {
  /* MODULE4 - TASK2 */
  var price = window.map.adForm.querySelector('#price');
  var selectType = window.map.adForm.querySelector('#type');
  var selectTimeIn = window.map.adForm.querySelector('#timein');
  var selectTimeOut = window.map.adForm.querySelector('#timeout');
  var selectRoom = window.map.adForm.querySelector('#room_number');
  var selectCapacity = window.map.adForm.querySelector('#capacity');
  var submit = window.map.adForm.querySelector('.ad-form__submit');
  var fieldsets = window.map.adForm.querySelectorAll('fieldset > input, select');
  var PriceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  setMinPrice(selectType.value);

  window.map.adForm.addEventListener('input', onElementInput);
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
    for (var i = 0; i < fieldsets.length; i++) {
      var fieldset = fieldsets[i];
      if (!fieldset.validity.valid) {
        fieldset.classList.add('field-invalid');
      }
    }
  }

  /* MODULE5 - TASK1 */
  var startCoords = {};
  var limits = {
    top: 130,
    left: 1,
    right: 1135,
    bottom: 630
  };
  window.map.mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

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
    var addressCoords = window.map.getAddress(window.map.mapPinMain);
    window.map.setAddress(addressCoords);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  function calculateNewCoords(shift) {
    var newCoords = {
      x: window.map.mapPinMain.offsetLeft - shift.x,
      y: window.map.mapPinMain.offsetTop - shift.y
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
    window.map.mapPinMain.style.left = coords.x + 'px';
    window.map.mapPinMain.style.top = coords.y + 'px';
  }
  window.form = {
    onDocumentMouseMove: onDocumentMouseMove
  };
})();
