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
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var WIZARDS_COUNT = 4;
var PageElements = {
  SETUP: '.setup',
  BUTTON_OPEN: '.setup-open',
  BUTTON_CLOSE: '.setup-close',
  INPUT_NAME: '.setup-user-name',
  INPUT_COAT: '[name="coat-color"]',
  INPUT_EYES: '[name="eyes-color"]',
  INPUT_FIREBALL: '[name="fireball-color"]',
  SETUP_COAT: '.setup-wizard .wizard-coat',
  SETUP_EYES: '.setup-wizard .wizard-eyes',
  SETUP_FIREBALL: '.setup-fireball-wrap',
  SIMILAR: '.setup-similar',
  TEMPLATE: '#similar-wizard-template',
  LIST: '.setup-similar-list',
  ITEM: '.setup-similar-item',
  LABEL: '.setup-similar-label',
  SIMILAR_COAT: '.wizard-coat',
  SIMILAR_EYES: '.wizard-eyes'
};
var ClassName = {
  HIDDEN: 'hidden'
};
var Key = {
  ESC: 27,
  ENTER: 13
};

var setup = document.querySelector(PageElements.SETUP);
var setupOpen = document.querySelector(PageElements.BUTTON_OPEN);
var setupClose = setup.querySelector(PageElements.BUTTON_CLOSE);
var setupInputName = setup.querySelector(PageElements.INPUT_NAME);
var setupInputCoat = setup.querySelector(PageElements.INPUT_COAT);
var setupInputEyes = setup.querySelector(PageElements.INPUT_EYES);
var setupInputFireball = setup.querySelector(PageElements.INPUT_FIREBALL);
var setupCoat = setup.querySelector(PageElements.SETUP_COAT);
var setupEyes = setup.querySelector(PageElements.SETUP_EYES);
var setupFireball = setup.querySelector(PageElements.SETUP_FIREBALL);

var similarWizardTemplate = document.querySelector(PageElements.TEMPLATE).content.querySelector(PageElements.ITEM);
var similarListElement = document.querySelector(PageElements.LIST);

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  return arr[getRandomFromInterval(0, arr.length)];
};

var createWizard = function (namesArr, surnamesArr, coatColorsArr, eyesColorsArr) {
  var wizard = {};
  wizard.name = getRandomElement(namesArr) + ' ' + getRandomElement(surnamesArr);
  wizard.coatColor = getRandomElement(coatColorsArr);
  wizard.eyesColor = getRandomElement(eyesColorsArr);
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
  wizardElement.querySelector(PageElements.SIMILAR_COAT).style.fill = wizard.coatColor;
  wizardElement.querySelector(PageElements.SIMILAR_EYES).style.fill = wizard.eyesColor;

  return wizardElement;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === Key.ESC) {
    closePopup();
  }
};

var onInputNameFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onInputNameBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {

  setup.classList.remove(ClassName.HIDDEN);

  setupInputName.addEventListener('focus', onInputNameFocus);
  setupInputName.addEventListener('blur', onInputNameBlur);
  document.addEventListener('keydown', onPopupEscPress);
  setupCoat.addEventListener('click', onCoatClick);
  setupEyes.addEventListener('click', onEyesClick);
  setupFireball.addEventListener('click', onFireballClick);
};

var closePopup = function () {
  setup.classList.add(ClassName.HIDDEN);

  setupInputName.removeEventListener('focus', onInputNameFocus);
  setupInputName.removeEventListener('blur', onInputNameBlur);
  document.removeEventListener('keydown', onPopupEscPress);
  setupCoat.removeEventListener('click', onCoatClick);
  setupEyes.removeEventListener('click', onEyesClick);
  setupFireball.removeEventListener('click', onFireballClick);
};

var currentCoatIndex = 1;
var onCoatClick = function () {
  setupCoat.style.fill = COAT_COLORS[currentCoatIndex];
  setupInputCoat.value = COAT_COLORS[currentCoatIndex];
  currentCoatIndex = currentCoatIndex === COAT_COLORS.length - 1 ? 0 : currentCoatIndex + 1;
};

var currentEyesIndex = 1;
var onEyesClick = function () {
  setupEyes.style.fill = EYES_COLORS[currentEyesIndex];
  setupInputEyes.value = EYES_COLORS[currentEyesIndex];
  currentEyesIndex = currentEyesIndex === EYES_COLORS.length - 1 ? 0 : currentEyesIndex + 1;
};

var currentFireballIndex = 1;
var onFireballClick = function () {
  setupFireball.style.background = FIREBALL_COLORS[currentFireballIndex];
  setupInputFireball.value = FIREBALL_COLORS[currentFireballIndex];
  currentFireballIndex = currentFireballIndex === FIREBALL_COLORS.length - 1 ? 0 : currentFireballIndex + 1;
};

var wizards = addWizards(WIZARDS_COUNT);
var wizardTemplate = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  wizardTemplate.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(wizardTemplate);

setup.querySelector(PageElements.SIMILAR).classList.remove(ClassName.HIDDEN);

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Key.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Key.ENTER) {
    closePopup();
  }
});
