'use strict';

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
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARDS_COUNT = 4;

var setupWindow = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var createWizard = function (namesArr, surnamesArr, coatColorsArr, eyesColorsArr) {
  var wizard = {};
  wizard.name = namesArr[getRandomInt(0, namesArr.length)] + ' ' + surnamesArr[getRandomInt(0, surnamesArr.length)];
  wizard.coatColor = coatColorsArr[getRandomInt(0, coatColorsArr.length)];
  wizard.eyesColor = eyesColorsArr[getRandomInt(0, eyesColorsArr.length)];
  return wizard;
};

var addWizards = function (count) {
  var wizardsArr = [];

  for (var i = 0; i < count; i++) {
    wizardsArr.push(createWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }

  return wizardsArr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = addWizards(WIZARDS_COUNT);
var fragmentWizards = document.createDocumentFragment();

setupWindow.classList.remove('hidden');

for (var i = 0; i < wizards.length; i++) {
  fragmentWizards.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragmentWizards);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');
