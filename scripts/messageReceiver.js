/**
 * Script to be injected in the webpage.
 * Responsible for executing stuff from the extension.
 */
(function () {
  if (!window.dfpVastTagTesterInstalled) {
    Object.defineProperty(window, 'dfpVastTagTesterInstalled', {
      enumerable: false,
      writable: false,
      value: true
    });
    chrome.runtime.onMessage.addListener(
      function (message, sender, sendResponse) {
        console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");
        console.log("message:", message);

        var response;
        var error;

        try {
          if (message.type === 'set') {
            window.localStorage.setItem(
              'Spieler.DFP.debugConfig', JSON.stringify(message.data)
            );
          } else if (message.type === 'remove') {
            window.localStorage.removeItem('Spieler.DFP.debugConfig');
          } else if (message.type === 'get') {
            response = window.localStorage.getItem('Spieler.DFP.debugConfig');
          }
        } catch (e) {
          error = e
        }

        sendResponse(error, response);
      });
    console.log('ePlayer - DFP VAST tag tester - Installed 🤟');
  }
})();
