import { getRctState, setRctState } from "./utils.mjs";

async function main() {
    const state = await getRctState();
    const rct_div = document.getElementById("rctDiv");
    const rct_button = document.getElementById("rctButton");

    if (rct_div !== null) {
        const list = document.createElement("ol");
        for (const tab of state.removedTabs) {
            const list_item = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = (tab.title !== undefined ? tab.title : "");
            a.href = (tab.url !== undefined ? tab.url : "");
            const img = document.createElement("img");
            img.src = (tab.favicon !== undefined ? tab.favicon : "");
            list_item.appendChild(img);
            list_item.appendChild(a);
            list.appendChild(list_item);
        }
        rct_div.appendChild(list);
    }
    if (rct_button !== null) {
        rct_button.onclick = async () => {
            const state = await getRctState();
            state.removedTabs = [];
            await setRctState(state);
            chrome.action.setBadgeText({ text: `${state.removedTabs.length}` });
            location.reload();
        }
    }
}

main();
