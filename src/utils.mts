import { RctStateRemovedTabs } from "./interfaces.mjs";
import { TabInfo } from "./interfaces.mjs";

export async function getRctStateRemovedTabs(): Promise<RctStateRemovedTabs> {
    let rct_state: RctStateRemovedTabs = {
        removedTabs: [],
        removedTabsArrayMaxSize: 25,
    };
    const stateRemovedTabs = await chrome.storage.local.get("state:removedTabs") as { [key: string]: TabInfo[] | undefined };
    const removedTabs = stateRemovedTabs["state:removedTabs"];
    if (removedTabs !== undefined) {
        rct_state.removedTabs = removedTabs;
    }
    const stateRemovedTabsArrayMaxSize = await chrome.storage.local.get("state:removedTabsArrayMaxSize") as { [key: string]: number | undefined };
    const removedTabsArrayMaxSize = stateRemovedTabsArrayMaxSize["state:removedTabsArrayMaxSize"];
    if (removedTabsArrayMaxSize !== undefined) {
        rct_state.removedTabsArrayMaxSize = removedTabsArrayMaxSize;
    }
    return rct_state;
}

export async function clearRctState() {
    await chrome.storage.local.remove("state");
}

export async function setRctStateRemovedTabs(state: RctStateRemovedTabs) {
    await chrome.storage.local.set({ "state:removedTabs": state.removedTabs });
}

export async function setRctStateRemovedTabsArrayMaxSize(state: RctStateRemovedTabs) {
    await chrome.storage.local.set({ "state:removedTabsArrayMaxSize": state.removedTabs });
}

export async function setRctStateTab(tabid: number, tab: TabInfo) {
    await chrome.storage.local.set({ [`state:tabs:${tabid}`]: tab });
}

export async function getRctStateTab(tabid: number): Promise<TabInfo | undefined> {
    let stateTabInfo = await chrome.storage.local.get(`state:tabs:${tabid}`) as { [key: string]: TabInfo | undefined };
    const tab_info = stateTabInfo[`state:tabs:${tabid}`];
    return tab_info;
}
