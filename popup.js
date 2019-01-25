var inputObject = {
  "preroll": "",
  "sting": "",
  "postroll": "",
  "parameters": {}
}

function click(vastObject) {
  var test = JSON.stringify(inputObject)
  chrome.tabs.executeScript(null,
    {code:"window.localStorage.setItem('Spieler.DFP.debugConfig', '" + test +  "')"});

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {

  var divs = document.querySelector('.js-input');
  var button = document.querySelector('.js-setVastTag');

  button.addEventListener(('click'), click)
});
