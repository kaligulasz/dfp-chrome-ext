// Initial injection of message receiver
chrome.tabs.executeScript(null, {
  file: 'scripts/messageReceiver.js'
});

/**
 * Send a request for our content script
 * @param {string} type "set"|"remove"|"get"
 * @param {*} data just JSON in case of "setting"
 * @returns {Promise} chain it with .then(response) to receive data in case of "get"
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
      });
    });
  });
}

const inputObject = {
  'preroll': '',
  'sting': '',
  'postroll': '',
  'parameters': {}
};

function handleShowBranchInput() {
  const branchInput = document.querySelector('[data-element="branch-name"]');

  this.checked ? branchInput.classList.remove('hidden') : branchInput.classList.add('hidden');
}

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
    });
}

function handleUpdateUrl(event) {
  event.preventDefault();

  const updateElement = event.target.elements["branch"].value;

  chrome.storage.sync.set({'branchName': updateElement});

  chrome.tabs.getSelected(null, tab => {
    let tabUrl = tab.url;

    if(tabUrl.indexOf('ep4-branch') > -1) {
      const matchIndex = tabUrl.match(/ep4-branch=/).index - 1;

      tabUrl = tabUrl.substring(0, matchIndex);
    }

    let divisionSign = tabUrl.indexOf('?') > -1 ? '&' : '?';

    chrome.tabs.update(tab.id, {
      url: `${tabUrl}${divisionSign}ep4-branch=${updateElement}`,
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-element="dfp-form"]');
  const clearLocalStorageButton = document.querySelector('[data-js-element="clear-local-storage"]');
  const branchForm = document.querySelector('[data-element="branch-form"]');
  const switchInput = document.querySelector('[data-element="branch-switch"]');

  chrome.storage.sync.get('branchName', obj => {
    branchForm.elements["branch"].value = obj.branchName.toString();
  });

  clearLocalStorageButton.addEventListener('click', () => sendMessage('remove'));
  form.addEventListener('submit', handleFormSubmit);
  switchInput.addEventListener('change', handleShowBranchInput);
  branchForm.addEventListener('submit', handleUpdateUrl);
});
