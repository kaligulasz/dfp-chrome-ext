var inputObject = {
  'preroll': '',
  'sting': '',
  'postroll': '',
  'parameters': {}
};

function handleFormSubmit(event) {
  event.preventDefault();
  
  var formElements = event.target.elements;

  for (var i = 0; i < formElements.length; i++) {
    if (formElements[i].name in inputObject) {
      inputObject[formElements[i].name] = formElements[i].value;
    }
  }

  chrome.tabs.executeScript(
    null, {
      code: "window.localStorage.setItem('Spieler.DFP.debugConfig', '" + JSON.stringify(inputObject) +  "')"
    }
  );

  window.close();
}

function handleClearLocalStorage() {
  chrome.tabs.executeScript(
    null, {
      code: "window.localStorage.removeItem('Spieler.DFP.debugConfig')"
    }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('[data-element="dfp-form"]');
  var clearLocalStorageButton = document.querySelector('[data-js-element="clear-local-storage"]');

  clearLocalStorageButton.addEventListener('click', handleClearLocalStorage)
  form.addEventListener('submit', handleFormSubmit);
});
