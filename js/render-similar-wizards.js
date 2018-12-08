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

  var wizardsData = window.similarWizards;

  var similarWizardsBlock = document.querySelector(Selectors.BLOCK);
  var wizardTemplate = document.querySelector(Selectors.TEMPLATE).content.querySelector(Selectors.ITEM);
  var wizardsList = document.querySelector(Selectors.LIST);
  var wizardsFragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector(Selectors.NAME).textContent = wizard.name;
    wizardElement.querySelector(Selectors.COAT).style.fill = wizard.coatColor;
    wizardElement.querySelector(Selectors.EYES).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  for (var i = 0; i < wizardsData.length; i++) {
    wizardsFragment.appendChild(renderWizard(wizardsData[i]));
  }

  wizardsList.appendChild(wizardsFragment);

  similarWizardsBlock.classList.remove(ClassNames.HIDDEN);
})();
