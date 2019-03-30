/**
 * Send a request for our content script
 * @param {string} type 'set'|'remove'|'get'
 * @param {*} data just JSON in case of 'setting'
 * @returns {Promise} chain it with .then(response) to receive data in case of 'get'
 */
function sendMessage(type, data) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { type, data }, {}, function(data) {
        if (data.error) {
					reject(data.error);
        } else {
					resolve(data.response);
        }
      });
    });
  });
}

export default sendMessage