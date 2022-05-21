import { useState, useEffect } from 'react';

interface fetchTabsOptions {
  currentWindow?: boolean;
  active?: boolean;
}

const fetchTabs = async (options: fetchTabsOptions) => chrome.tabs.query(options);

export const useCurrentTabUrl = () => {
  const [currentTabUrl, setCurrentTabUrl] = useState<string | undefined>('');

  useEffect(() => {
    async function fetchTabsUrl() {
      try {
        const tabs = await fetchTabs({ currentWindow: true, active: true });
        const tabUrl = tabs[0]?.url;
        setCurrentTabUrl(tabUrl);
        // setTabUrlHost(tabs[0]?.url);
      } catch (error) {
        setCurrentTabUrl('');
      }
    };

    fetchTabsUrl();
  }, []);

  return [currentTabUrl];
}

