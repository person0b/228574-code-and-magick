'use strict';

(function () {
  var Selector = {
    BLOCK: '.setup-similar',
    TEMPLATE: '#similar-wizard-template',
    LIST: '.setup-similar-list',
    ITEM: '.setup-similar-item',
    NAME: '.setup-similar-label',
    COAT: '.wizard-coat',
    EYES: '.wizard-eyes'
  };
  var ClassName = {
    HIDDEN: 'hidden'
  };
  var WIZARDS_COUNT = 4;
  var ERROR_STYLE = 'margin: 10px auto; font-size: 30px; text-align: center; color: white; background-color: red;';

  var similarWizardsBlock = document.querySelector(Selector.BLOCK);
  var wizardTemplate = document.querySelector(Selector.TEMPLATE).content.querySelector(Selector.ITEM);
  var wizardsList = document.querySelector(Selector.LIST);
  var wizardsFragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector(Selector.NAME).textContent = wizard.name;
    wizardElement.querySelector(Selector.COAT).style.fill = wizard.colorCoat;
    wizardElement.querySelector(Selector.EYES).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var addWizards = function (wizardsData) {
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardsFragment.appendChild(renderWizard(wizardsData[i]));
    }
    wizardsList.appendChild(wizardsFragment);
  };

  var wizardsDataError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = ERROR_STYLE;
    element.textContent = errorMessage;
    wizardsList.insertAdjacentElement('afterend', element);
  };

  window.backend.load(addWizards, wizardsDataError);
  similarWizardsBlock.classList.remove(ClassName.HIDDEN);
})();
