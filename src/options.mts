import { getRctStateRemovedTabs, setRctStateRemovedTabs, setRctStateRemovedTabsArrayMaxSize } from "./utils.mjs";

async function main() {
    const state = await getRctStateRemovedTabs();
    const removed_tabs_array_max_size_input = document.getElementById("removed_tabs_array_max_size_input") as HTMLInputElement;
    removed_tabs_array_max_size_input.value = state.removedTabsArrayMaxSize.toString();

    const removed_tabs_array_max_size_form = document.getElementById("submit-removed_tabs_array_max_size-form") as HTMLFormElement;
    removed_tabs_array_max_size_form.onsubmit = async (e) => {
        e.preventDefault();
        const state = await getRctStateRemovedTabs();
        const removed_tabs_array_max_size_input = document.getElementById("removed_tabs_array_max_size_input") as HTMLInputElement;
        state.removedTabsArrayMaxSize = +removed_tabs_array_max_size_input.value;
        while (state.removedTabs.length > state.removedTabsArrayMaxSize)
            state.removedTabs.shift();
        setRctStateRemovedTabs(state);
        setRctStateRemovedTabsArrayMaxSize(state);
        chrome.action.setBadgeText({ text: `${state.removedTabs.length}` });
    };
}

main();
