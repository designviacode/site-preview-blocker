import { previewBlocker } from './modules/preview-blocker';

const BUTTON_IDENTIFIER = 'SPB_button';
const platforms = {
  'https://www.glassdoor.com': {
    label: 'Glassdoor',
    selectors: ["#ContentWallHardsell", "#jobsAwareness"],
    fixScrollLock: true,
  },
};

const hasClass = (elem, className) => {
  return elem.classList.contains(className);
}

const contentBlocker = (platformName) => {
  const selectorsToRemove = platforms[platformName]?.selectors;

  previewBlocker.removeElements(selectorsToRemove);
  previewBlocker.changeOverflow(document.body);
  previewBlocker.changeOverflow(document.documentElement);
}

const createDOMButton = () => {
  const btn = document.createElement('button');
  const btnText = document.createTextNode('HIDE');
  btn.id = BUTTON_IDENTIFIER;
  btn.className = BUTTON_IDENTIFIER;
  btn.style.position = 'fixed';
  btn.style.bottom = '2rem';
  btn.style.right = '2rem';
  btn.style.height = '4rem';
  btn.style.width = '4rem';
  btn.style.backgroundColor = document.querySelector('meta[name="theme-color"]').getAttribute('content');
  btn.style.border = '3px solid rgba(255,255,255,0.5)';
  btn.style.borderRadius = '100%';
  btn.style.boxShadow = '0 7px 5px rgba(0,0,0,0.2)';
  btn.style.color = 'white';
  btn.style.cursor = 'pointer';
  btn.style.fontSize = '0.8rem';
  btn.style.fontWeight = 900;
  btn.style.letterSpacing = '0.1rem';
  btn.style.outline = 'none';
  btn.style.zIndex = 10000;

  btn.appendChild(btnText);
  document.body.appendChild(btn);

  document.addEventListener('click', function (e) {
    if (hasClass(e.target, BUTTON_IDENTIFIER)) {
      toggleDOMButtonText();
      contentBlocker(window.location.origin);
    }
  });
}

const toggleDOMButtonText = () => {
  const btn = document.querySelector(`.${BUTTON_IDENTIFIER}`);
  btn.textContent = btn.textContent === 'HIDE' ? 'SHOW' : 'HIDE';
}

// Function called when a new message is received
const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  console.log('[content.js]. Message received', msg);
  const { params: { tabUrl } } = msg;
  contentBlocker(tabUrl?.origin);

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
console.log('Must reload extension for modifications to take effect.');
createDOMButton();