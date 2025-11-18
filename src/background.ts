import { getRctStateRemovedTabs, getRctStateTab, setRctStateRemovedTabs, setRctStateTab } from "./utils.mjs";

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
    const tab = await getRctStateTab(tabId);
    if (tab !== undefined) {
        let state = await getRctStateRemovedTabs();
        if (state.removedTabs.length >= state.removedTabsArrayMaxSize)
            state.removedTabs.shift();
        state.removedTabs.push(tab);
        await setRctStateRemovedTabs(state);
        chrome.action.setBadgeText({ text: `${state.removedTabs.length}` });
    }
})

chrome.tabs.onUpdated.addListener(async (tabId: number, updateinfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    if (updateinfo.url !== undefined) {
        await setRctStateTab(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
    }
    if (updateinfo.title !== updateinfo) {
        await setRctStateTab(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
    }
    if (updateinfo.favIconUrl !== undefined) {
        await setRctStateTab(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
    }
})

chrome.tabs.onActivated.addListener(async (activeinfo: chrome.tabs.OnActivatedInfo) => {
    const tabId = activeinfo.tabId;
    const tab = await chrome.tabs.get(tabId);
    await setRctStateTab(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
})
