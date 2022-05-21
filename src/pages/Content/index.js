import { previewBlocker } from './modules/preview-blocker';

console.log('Must reload extension for modifications to take effect.');

// Function called when a new message is received
const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  console.log('[content.js]. Message received', msg);
  const { params: { platforms, tabUrl } } = msg;
  const selectorsToRemove = platforms[tabUrl?.origin]?.selectors;

  previewBlocker.removeElements(selectorsToRemove);
  previewBlocker.changeOverflow(document.body);
  previewBlocker.changeOverflow(document.documentElement);

  // Prepare the response object with information about the site
  const response = {
    title: document.title,
  };

  sendResponse(response);
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);