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

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('[data-element="dfp-form"]');

  form.addEventListener('submit', handleFormSubmit);
});
