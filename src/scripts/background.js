import setIndicator from '../helpers/setIndicator'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        setIndicator()
    }
})

chrome.tabs.onHighlighted.addListener(highlightInfo => {
    setIndicator()
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'storageChanged') {
        setIndicator()
    }
})