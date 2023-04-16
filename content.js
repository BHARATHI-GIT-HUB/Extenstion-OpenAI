chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getTabUrl") {
    sendResponse({ tabUrl: window.location.href });
  }
});
