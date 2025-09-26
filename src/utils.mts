import { RctState } from "./interfaces.mjs";

export async function getRctState(): Promise<RctState> {
    let { state } = await chrome.storage.local.get("state") as { [key: string]: RctState | undefined };
    if (state == undefined) {
        state = {
            removedTabs: [],
            removedTabsArrayMaxSize: 25,
            tabs: new Map()
        }
    }

    return state;
}

export async function clearRctState() {
    await chrome.storage.local.remove("state");
}

export async function setRctState(state: RctState) {
    await chrome.storage.local.set({ state: state });
}
