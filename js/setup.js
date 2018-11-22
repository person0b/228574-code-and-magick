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
var HIDDEN_CLASS = 'hidden';
var PageElements = {
  SETUP: '.setup',
  SIMILAR: '.setup-similar',
  TEMPLATE: '#similar-wizard-template',
  LIST: '.setup-similar-list',
  ITEM: '.setup-similar-item',
  LABEL: '.setup-similar-label',
  COAT: '.wizard-coat',
  EYES: '.wizard-eyes'
};

var setupWindow = document.querySelector(PageElements.SETUP);
var similarWizardTemplate = document.querySelector(PageElements.TEMPLATE).content.querySelector(PageElements.ITEM);
var similarListElement = document.querySelector(PageElements.LIST);

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getValue = function (arr) {
  return arr[getRandomInt(0, arr.length)];
}

var createWizard = function (namesArr, surnamesArr, coatColorsArr, eyesColorsArr) {
  var wizard = {};
  wizard.name = getValue(namesArr) + ' ' + getValue(surnamesArr);
  wizard.coatColor = getValue(coatColorsArr);
  wizard.eyesColor = getValue(eyesColorsArr);
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

  wizardElement.querySelector(PageElements.LABEL).textContent = wizard.name;
  wizardElement.querySelector(PageElements.COAT).style.fill = wizard.coatColor;
  wizardElement.querySelector(PageElements.EYES).style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = addWizards(WIZARDS_COUNT);
var wizardTemplate = document.createDocumentFragment();

setupWindow.classList.remove(HIDDEN_CLASS);

for (var i = 0; i < wizards.length; i++) {
  wizardTemplate.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(wizardTemplate);

setupWindow.querySelector(PageElements.SIMILAR).classList.remove(HIDDEN_CLASS);
