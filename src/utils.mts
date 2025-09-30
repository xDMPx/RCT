import { LocalRctState, RctState } from "./interfaces.mjs";

export async function getRctState(): Promise<RctState> {
    let rct_state: RctState = {
        removedTabs: [],
        removedTabsArrayMaxSize: 25,
        tabs: new Map()
    };
    const { state } = await chrome.storage.local.get("state") as { [key: string]: LocalRctState | undefined };
    if (state !== undefined) {
        rct_state = {
            removedTabs: state.removedTabs,
            removedTabsArrayMaxSize: state.removedTabsArrayMaxSize,
            tabs: new Map(state.tabs),
        }
    }
    return rct_state;
}

export async function clearRctState() {
    await chrome.storage.local.remove("state");
}

export async function setRctState(state: RctState) {
    const tabs = [...state.tabs];
    const local_state: LocalRctState = {
        removedTabs: state.removedTabs,
        removedTabsArrayMaxSize: state.removedTabsArrayMaxSize,
        tabs: tabs
    };
    await chrome.storage.local.set({ state: local_state });
}
