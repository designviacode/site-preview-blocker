import { printLine } from './modules/print';
import { previewBlocker } from './modules/preview-blocker';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
// document.querySelectorAll('img').forEach((el) => el.style.opacity = 0.1);

// Function called when a new message is received
const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  const headlines = Array.from(document.getElementsByTagName("h1")).map(h1 => h1.innerText);
  // document.querySelectorAll('img').forEach((el) => {
  //   let value = window.getComputedStyle(el).getPropertyValue("opacity");

  //   if (value === 0.1) {
  //     el.style.opacity = 1;
  //   } else {
  //     el.style.opacity = 0.1;
  //   }
  // });

  console.log('[content.js]. Message received', msg);
  const { params: { platforms, tabUrl } } = msg;
  const selectorsToRemove = platforms[tabUrl?.origin]?.selectors;

  previewBlocker.removeElements(selectorsToRemove);
  previewBlocker.changeOverflow();

  // Prepare the response object with information about the site
  const response = {
    title: document.title,
    headlines,
  };

  sendResponse(response);
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);