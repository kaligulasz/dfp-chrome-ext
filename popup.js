const inputObject = {
  'preroll': '',
  'sting': '',
  'postroll': '',
  'parameters': {}
};

function handleFormSubmit(event) {
  event.preventDefault();

  const formElements = event.target.elements;

  for (let i = 0; i < formElements.length; i++) {
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-element="dfp-form"]');
  const clearLocalStorageButton = document.querySelector('[data-js-element="clear-local-storage"]');

  clearLocalStorageButton.addEventListener('click', handleClearLocalStorage)
  form.addEventListener('submit', handleFormSubmit);
});
