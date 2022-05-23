import React, { useState, useEffect, useCallback } from 'react';
import { Footer } from '../../components/Footer';
import { useCurrentTabUrl } from '../../hooks/useCurrentTabUrl';
import logo128 from '../../assets/img/icon-128';
import { platformKeys } from '../../utils/platformKeys';
import '../../styles/common.css';
import '../../styles/flex.css';
import './Popup.css';
import './style.css';

export const platforms = {
  [platformKeys.GLASSDOOR]: {
    label: 'Glassdoor',
    selectors: ["#ContentWallHardsell", "#jobsAwareness"],
    fixScrollLock: true,
  },
};

const Popup = () => {
  const [currentTabUrl] = useCurrentTabUrl();
  const [tabUrl, setTabUrl] = useState({});

  useEffect(() => {
    if (currentTabUrl) {
      const urlInstance = new URL(currentTabUrl);
      setTabUrl({
        instance: urlInstance,
        origin: urlInstance.origin,
        full: urlInstance.href
      });
    }
  }, [currentTabUrl]);

  const handleOnBlockClick = useCallback(() => {
    chrome.tabs && chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        {/*
          - tabID: current Tab ID
          - messageType: message-type object
          - callback fn - not much to explain here now, is there?
        */}
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { type: 'GET_DOM', params: { platforms, tabUrl } },
          (response) => console.log('response', response)
        );
      }
    );
  }, [tabUrl]);

  return (
    <div className="App">
      <a className="logo" href="https://site-preview-blocker.com" target="_blank" rel="noreferrer noopener">
        <div className="headline-wrapper">
          <img src={logo128} className="App-logo" alt="logo" />
          <h1>PREVIEW BLOCKER</h1>
        </div>
      </a>

      <div className="flex flex-col">
        <div className='header'>
          <div className="header__control header__site-toggle">
            <button className="button site-toggle">
              <span className="button__wrapper">
                <span className="site-toggle__url" title={tabUrl.full}>
                  {tabUrl.origin}
                </span>
              </span>
            </button>
          </div>

          <div className="header__control header__app-toggle">
            <span className="toggle toggle--checked">
              <span className="toggle__btn toggle__on toggle__btn--active">On</span>
              <span className="toggle__btn toggle__off">Off</span>
            </span>
          </div>
        </div>

        <ul>
          <li className="flex justify-between">
            {platforms[platformKeys.GLASSDOOR].label}
            <button onClick={handleOnBlockClick}>
              BLOCK
            </button>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default Popup;
