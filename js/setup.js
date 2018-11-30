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
var KeyCode = {
  ESC: 27,
  ENTER: 13
};
var NameLength = {
  MIN: 2,
  MAX: 25
};

var setup = document.querySelector(PageElements.SETUP);
var setupOpen = document.querySelector(PageElements.BUTTON_OPEN);
var setupClose = setup.querySelector(PageElements.BUTTON_CLOSE);
var nameInput = setup.querySelector(PageElements.INPUT_NAME);
var coatInput = setup.querySelector(PageElements.INPUT_COAT);
var eyesInput = setup.querySelector(PageElements.INPUT_EYES);
var fireballInput = setup.querySelector(PageElements.INPUT_FIREBALL);
var coatPreview = setup.querySelector(PageElements.SETUP_COAT);
var eyesPreview = setup.querySelector(PageElements.SETUP_EYES);
var fireballPreview = setup.querySelector(PageElements.SETUP_FIREBALL);

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
  if (evt.keyCode === KeyCode.ESC && document.activeElement !== nameInput) {
    closePopup();
  }
};

var openPopup = function () {

  setup.classList.remove(ClassName.HIDDEN);

  document.addEventListener('keydown', onPopupEscPress);
  coatPreview.addEventListener('click', onCoatClick);
  eyesPreview.addEventListener('click', onEyesClick);
  fireballPreview.addEventListener('click', onFireballClick);
  nameInput.addEventListener('input', onNameInputValidity);
};

var closePopup = function () {
  setup.classList.add(ClassName.HIDDEN);

  document.removeEventListener('keydown', onPopupEscPress);
  coatPreview.removeEventListener('click', onCoatClick);
  eyesPreview.removeEventListener('click', onEyesClick);
  fireballPreview.removeEventListener('click', onFireballClick);
  nameInput.removeEventListener('input', onNameInputValidity);
};

var selectedColors = {
  coat: 1,
  eyes: 1,
  fireball: 1
};

var onCoatClick = function () {
  coatPreview.style.fill = COAT_COLORS[selectedColors.coat % COAT_COLORS.length];
  coatInput.value = COAT_COLORS[selectedColors.coat % COAT_COLORS.length];
  selectedColors.coat++;
};

var onEyesClick = function () {
  eyesPreview.style.fill = EYES_COLORS[selectedColors.eyes % EYES_COLORS.length];
  eyesInput.value = EYES_COLORS[selectedColors.eyes % EYES_COLORS.length];
  selectedColors.eyes++;
};

var onFireballClick = function () {
  fireballPreview.style.background = FIREBALL_COLORS[selectedColors.fireball % FIREBALL_COLORS.length];
  fireballInput.value = FIREBALL_COLORS[selectedColors.fireball % FIREBALL_COLORS.length];
  selectedColors.fireball++;
};

var onNameInputValidity = function (evt) {
  var target = evt.target;
  if (target.value.length < NameLength.MIN) {
    target.setCustomValidity('Имя должно состоять минимум из ' + NameLength.MIN + ' символов');
  } else if (target.value.length > NameLength.MAX) {
    target.setCustomValidity('Имя не должно быть длиннее ' + NameLength.MAX + ' символов');
  } else {
    target.setCustomValidity('');
  }
};

var wizards = addWizards(WIZARDS_COUNT);
var wizardTemplate = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  wizardTemplate.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(wizardTemplate);

setup.querySelector(PageElements.SIMILAR).classList.remove(ClassName.HIDDEN);

setupOpen.addEventListener('click', openPopup);
setupClose.addEventListener('click', closePopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closePopup();
  }
});
