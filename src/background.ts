const removedTabs: TabInfo[] = []
const removedTabsMaxLenght: number = 4
const tabs: Map<number, TabInfo> = new Map();

interface TabInfo {
    url: string | undefined,
    favicon: string | undefined
}

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
    const tab = tabs.get(tabId);
    if (tab !== undefined) {
        if (removedTabs.length >= removedTabsMaxLenght)
            removedTabs.shift();
        removedTabs.push(tab);
    }
    console.log(removedTabs);
})

chrome.tabs.onUpdated.addListener(async (tabId: number, updateinfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    if (updateinfo.status == chrome.tabs.TabStatus.COMPLETE) {
        console.log("----");
        console.log("saving");
        console.log(tab);
        tabs.set(tabId, { url: tab.url, favicon: tab.favIconUrl });
    } else if (updateinfo.favIconUrl !== undefined) {
        console.log("----");
        console.log("fav saving");
        console.log(tab);
        tabs.get(tabId)!.favicon = updateinfo.favIconUrl
    }
})
