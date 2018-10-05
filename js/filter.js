'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 20;
  var filterForm = document.querySelector('.map__filters');
  var mapFeatures = filterForm.querySelectorAll('.map__checkbox');
  var selects = filterForm.querySelectorAll('.map__filter');

  function debounceFiltration(fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      console.log(args);
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  function getFilteredOffers(data) {
    var filter = getUserProperty();
    var cards = [];
    data.forEach(function (offer) {
      var userOffer = offer.offer;
      var isType = compareType(userOffer, filter);
      var isPrice = comparePrice(userOffer, filter);
      var isRooms = compareRooms(userOffer, filter);
      var isGuests = compareGuests(userOffer, filter);
      var isFeatures = compareFeatures(userOffer, filter);
      if (isType && isPrice && isRooms && isGuests && isFeatures) {
        cards.push(offer);
      }
    });
    return cards.slice(0, 5);
  }

  function compareType(offer, filter) {
    return offer.type === filter.type || filter.type === 'any';
  }

  function comparePrice(offer, filter) {
    return ((filter.price === 'low' && offer.price < 10000) ||
      (filter.price === 'high' && offer.price > 50000) ||
      (filter.price === 'middle' && (offer.price >= 10000 && offer.price <= 50000)) ||
      filter.price === 'any');
  }

  function compareRooms(offer, filter) {
    return offer.rooms === +filter.rooms || filter.rooms === 'any';
  }

  function compareGuests(offer, filter) {
    return offer.guests === +filter.guests || filter.guests === 'any';
  }

  function compareFeatures(offer, filter) {
    if (filter.features.length === 0) {
      return true;
    } else {
      return filter.features.every(function (feature) {
        return offer.features.indexOf(feature) !== -1;
      });
    }
  }

  function getUserProperty() {
    var customFilter = {
      features: [],
      type: '',
      price: '',
      guests: '',
      rooms: ''
    };
    selects.forEach(function (select) {
      switch (select.id) {
        case 'housing-type':
          customFilter.type = select.value;
          break;
        case 'housing-price':
          customFilter.price = select.value;
          break;
        case 'housing-rooms':
          customFilter.rooms = select.value;
          break;
        case 'housing-guests':
          customFilter.guests = select.value;
          break;
        default: break;
      }
    });
    mapFeatures.forEach(function (feature) {
      if (feature.checked) {
        customFilter.features.push(feature.value);
      }
    });
    return customFilter;
  }

  window.filter = function (data, callback) {
    filterForm.addEventListener('change', function () {
      var filteredAds = getFilteredOffers(data);
      console.log(filteredAds);
      window.pins.remove();
      window.card.close();
      callback(filteredAds);
      /*debounceFiltration(function () {
        callback(filteredAds);
      });*/
    });
  };
})();

