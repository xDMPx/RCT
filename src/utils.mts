import { RctState } from "./interfaces.mjs";
import { TabInfo } from "./interfaces.mjs";

export async function getRctState(): Promise<RctState> {
    let rct_state: RctState = {
        removedTabs: [],
        removedTabsArrayMaxSize: 25,
        tabs: new Map()
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
    const stateTabs = await chrome.storage.local.get("state:tabs") as { [key: string]: [number, TabInfo][] | undefined };
    const tabs = stateTabs["state:tabs"];
    if (tabs !== undefined) {
        rct_state.tabs = new Map(tabs);
    }
    return rct_state;
}

export async function clearRctState() {
    await chrome.storage.local.remove("state");
}

export async function setRctStateRemovedTabs(state: RctState) {
    await chrome.storage.local.set({ "state:removedTabs": state.removedTabs });
}

export async function setRctStateRemovedTabsArrayMaxSize(state: RctState) {
    await chrome.storage.local.set({ "state:removedTabsArrayMaxSize": state.removedTabs });
}

export async function setRctStateTabs(state: RctState) {
    const tabs = [...state.tabs];
    await chrome.storage.local.set({ "state:tabs": tabs });
}
