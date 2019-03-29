// Initial injection of message receiver
chrome.tabs.executeScript(null, {
  file: 'scripts/messageReceiver.js'
});

/**
 * Send a request for our content script
 * @param {string} type what kind of job our script must perform
 * @param {*} data just JSON in case of "setting"
 */
function sendMessage(type, data) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type, data }, {}, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      })
    })
  })
}

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

  sendMessage('set', inputObject)
    .then(response => {
      window.close();
    })
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-element="dfp-form"]');
  const clearLocalStorageButton = document.querySelector('[data-js-element="clear-local-storage"]');

  clearLocalStorageButton.addEventListener('click', () => sendMessage('clear'))
  form.addEventListener('submit', handleFormSubmit);
});
