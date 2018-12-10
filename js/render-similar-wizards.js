'use strict';

(function () {
  var Selectors = {
    BLOCK: '.setup-similar',
    TEMPLATE: '#similar-wizard-template',
    LIST: '.setup-similar-list',
    ITEM: '.setup-similar-item',
    NAME: '.setup-similar-label',
    COAT: '.wizard-coat',
    EYES: '.wizard-eyes'
  };
  var ClassNames = {
    HIDDEN: 'hidden'
  };
  var ERROR_STYLE = 'margin: 10px auto; font-size: 30px; text-align: center; color: white; background-color: red;';

  var similarWizardsBlock = document.querySelector(Selectors.BLOCK);
  var wizardTemplate = document.querySelector(Selectors.TEMPLATE).content.querySelector(Selectors.ITEM);
  var wizardsList = document.querySelector(Selectors.LIST);
  var wizardsFragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector(Selectors.NAME).textContent = wizard.name;
    wizardElement.querySelector(Selectors.COAT).style.fill = wizard.colorCoat;
    wizardElement.querySelector(Selectors.EYES).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var addWizards = function (wizardsData) {
    for (var i = 0; i < 4; i++) {
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
  similarWizardsBlock.classList.remove(ClassNames.HIDDEN);
})();
