import { getRctState, setRctState } from "./utils.mjs";

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
    const state = await getRctState();
    const tab = state.tabs.get(tabId);
    if (tab !== undefined) {
        if (state.removedTabs.length >= state.removedTabsArrayMaxSize)
            state.removedTabs.shift();
        state.removedTabs.push(tab);
    }
    console.log(state.removedTabs);
    setRctState(state);
})

chrome.tabs.onUpdated.addListener(async (tabId: number, updateinfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    if (updateinfo.status == chrome.tabs.TabStatus.COMPLETE) {
        const state = await getRctState();
        state.tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl });
        setRctState(state);
    } else if (updateinfo.favIconUrl !== undefined) {
        const state = await getRctState();
        state.tabs.get(tabId)!.favicon = updateinfo.favIconUrl
        setRctState(state);
    }
})
