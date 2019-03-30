import sendMessage from './sendMessage'

function setIndicator(setBadge) {
  if (setBadge === true) {
    chrome.browserAction.setBadgeText({ text: "on" });
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#2bb559" //green
    });
  } else if (setBadge === false) {
    chrome.browserAction.setBadgeText({ text: "" });
  } else {
    sendMessage("get").then(response => {
      if (response) {
        chrome.browserAction.setBadgeText({ text: "on" });
        chrome.browserAction.setBadgeBackgroundColor({
          color: "#2bb559" //green
        })
      } else {
        chrome.browserAction.setBadgeText({ text: "" });
      }
    }).catch(err => {
      chrome.browserAction.setBadgeText({ text: "" }); 
    })
  }
}

export default setIndicator;
