'use strict';

(function () {
  var ERROR_STYLE = 'margin: 10px auto; font-size: 30px; text-align: center; color: white; background-color: red;';
  var WIZARDS_LIST_SELECTOR = '.setup-similar-list';
  var SimilarityPoint = {
    VERY: 2,
    MEDIUM: 1
  };

  var wizardsList = document.querySelector(WIZARDS_LIST_SELECTOR);

  var playerColor = {
    coat: window.editCoat.color,
    eyes: window.editEyes.color,
  };

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === playerColor.coat) {
      rank += SimilarityPoint.VERY;
    }
    if (wizard.colorEyes === playerColor.eyes) {
      rank += SimilarityPoint.MEDIUM;
    }

    return rank;
  };

  var namesComparator = function (a, b) {
    return (a - b);
  };

  var updateWizards = function () {
    var sortedWizards = wizards.slice();

    sortedWizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = namesComparator(a.name, b.name);
      }
      return rankDiff;
    });

    window.renderSimilarWizards(sortedWizards);
  };

  var onWizardCoatChange = window.utils.debounce(function (color) {
    playerColor.coat = color;
    updateWizards();
  });

  var onWizardEyesChange = window.utils.debounce(function (color) {
    playerColor.eyes = color;
    updateWizards();
  });

  var wizardsLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

  var wizardsLoadError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = ERROR_STYLE;
    element.textContent = errorMessage;
    wizardsList.insertAdjacentElement('afterend', element);
  };

  window.backend.load(wizardsLoadSuccess, wizardsLoadError);

  window.sortSimilarWizards = {
    onCoatChange: onWizardCoatChange,
    onEyesChange: onWizardEyesChange
  };
})();
