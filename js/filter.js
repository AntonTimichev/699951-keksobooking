'use strict';

(function () {
  var features = window.form.filter.querySelectorAll('.map__checkbox');
  var selects = window.form.filter.querySelectorAll('.map__filter');

  function getFilteredOffers(data) {
    var filter = getUserProperty();
    var cards = data.slice();
    return cards.filter(function (offer) {
      var userOffer = offer.offer;
      return compareType(userOffer, filter) &&
        comparePrice(userOffer, filter) &&
        compareRooms(userOffer, filter) &&
        compareGuests(userOffer, filter) &&
        compareFeatures(userOffer, filter);
    }).slice(0, 5);
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
    return offer.rooms === Number(filter.rooms) || filter.rooms === 'any';
  }

  function compareGuests(offer, filter) {
    return offer.guests === Number(filter.guests) || filter.guests === 'any';
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
    features.forEach(function (feature) {
      if (feature.checked) {
        customFilter.features.push(feature.value);
      }
    });
    return customFilter;
  }

  window.filter = {
    set: function (data, callback) {
      var filteredAds = getFilteredOffers(data);
      callback(filteredAds);
      var debounceCallback = window.debounce(callback);
      window.form.filter.addEventListener('change', function () {
        filteredAds = getFilteredOffers(data);
        debounceCallback(filteredAds);
      });
    }
  };
})();

