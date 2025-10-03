import { getRctState, setRctStateRemovedTabs, setRctStateTabs } from "./utils.mjs";

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
    let state = await getRctState();
    const tab = state.tabs.get(tabId);
    if (tab !== undefined) {
        if (state.removedTabs.length >= state.removedTabsArrayMaxSize)
            state.removedTabs.shift();
        state.removedTabs.push(tab);
    }
    await setRctStateRemovedTabs(state);
    chrome.action.setBadgeText({ text: `${state.removedTabs.length}` });
})

chrome.tabs.onUpdated.addListener(async (tabId: number, updateinfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    let state = await getRctState();
    if (updateinfo.url !== undefined) {
        state.tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
        await setRctStateTabs(state);
    }
    if (updateinfo.title !== updateinfo) {
        state.tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
        await setRctStateTabs(state);
    }
    if (updateinfo.favIconUrl !== undefined) {
        state.tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
        await setRctStateTabs(state);
    }
})

chrome.tabs.onActivated.addListener(async (activeinfo: chrome.tabs.OnActivatedInfo) => {
    const tabId = activeinfo.tabId;
    const tab = await chrome.tabs.get(tabId);
    let state = await getRctState();
    state.tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl, title: tab.title });
    await setRctStateTabs(state);
})
