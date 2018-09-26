'use strict';

(function () {
  var amountCards = 8;
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var offers = getOffers();

  function getRandomInteger(min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  function getRandomArrayElement(arr) {
    var min = 0;
    var max = arr.length - 1;
    var randomElement = getRandomInteger(min, max);
    return arr[randomElement];
  }

  function getMixArray(arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  function getArrRandomLength(arr) {
    var min = 0;
    var max = arr.length;
    var randomIndex = getRandomInteger(min, max);
    return arr.slice(0, randomIndex);
  }

  function getPhotos(array) {
    var arrPhotos = array.slice();
    return getMixArray(arrPhotos);
  }

  function getOffers() {
    var arrOffers = [];
    var titlesMix = getMixArray(titles);
    for (var i = 0; i < amountCards; i++) {
      var locationX = getRandomInteger(1, 1050);
      var locationY = getRandomInteger(130, 630);
      var card = {
        id: i,
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titlesMix[i],
          address: locationX + ', ' + locationY,
          price: getRandomInteger(1000, 1000000),
          type: getRandomArrayElement(types),
          rooms: getRandomInteger(1, 5),
          guests: getRandomInteger(1, 10),
          checkin: getRandomArrayElement(times),
          checkout: getRandomArrayElement(times),
          features: getArrRandomLength(features),
          description: '',
          photos: getPhotos(photos)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      arrOffers.push(card);
    }
    return arrOffers;
  }
  window.data = {
    offers: offers
  };
})();
