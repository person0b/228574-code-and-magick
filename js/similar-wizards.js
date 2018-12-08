'use strict';

(function () {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = window.data.coatColors;
  var EYES_COLORS = window.data.eyesColors;
  var WIZARDS_COUNT = 4;

  var createWizard = function (names, surnames, coatColors, eyesColors) {
    var wizard = {};
    wizard.name = window.utils.getRandomElement(names) + ' ' + window.utils.getRandomElement(surnames);
    wizard.coatColor = window.utils.getRandomElement(coatColors);
    wizard.eyesColor = window.utils.getRandomElement(eyesColors);
    return wizard;
  };

  var addWizards = function (count) {
    var wizardsArr = [];
    for (var i = 0; i < count; i++) {
      wizardsArr.push(createWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
    }
    return wizardsArr;
  };

  window.similarWizards = addWizards(WIZARDS_COUNT);
})();
