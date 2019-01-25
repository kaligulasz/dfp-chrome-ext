var inputObject = {
  "preroll": "",
  "sting": "",
  "postroll": "",
  "parameters": {}
}

function click() {
  inputObject.preroll = document.querySelector('.js-input').value;

  chrome.tabs.executeScript(null,
    {code:"window.localStorage.setItem('Spieler.DFP.debugConfig', '" + JSON.stringify(inputObject) +  "')"});

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.js-setVastTag');

  button.addEventListener(('click'), click)
});
