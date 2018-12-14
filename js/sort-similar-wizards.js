'use strict';

(function () {
  var ERROR_STYLE = 'margin: 10px auto; font-size: 30px; text-align: center; color: white; background-color: red;';
  var WIZARDS_LIST_SELECTOR = '.setup-similar-list';

  var wizardsList = document.querySelector(WIZARDS_LIST_SELECTOR);

  var playerColor = {
    coat: window.editCoat.color,
    eyes: window.editEyes.color,
  };

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === playerColor.coat) {
      rank += 2;
    }
    if (wizard.colorEyes === playerColor.eyes) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.renderSimilarWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
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
