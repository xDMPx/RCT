import { getRctState, setRctState } from "./utils.mjs";

async function main() {
    const state = await getRctState();
    const rct_div = document.getElementById("rctDiv");
    const rct_button = document.getElementById("rctButton");

    if (rct_div !== null) {
        const list = document.createElement("ol");
        list.className = "list-decimal list-inside";
        for (const tab of state.removedTabs) {
            const list_item = document.createElement("li");
            const div = document.createElement("div");
            const a = document.createElement("a");
            div.className = "pl-1 inline-flex text-wrap w-lg";
            a.innerText = (tab.title !== undefined ? tab.title : "");
            a.href = (tab.url !== undefined ? tab.url : "");
            a.className = "pl-2";
            const img = document.createElement("img");
            img.className = "my-auto";
            img.src = (tab.favicon !== undefined ? tab.favicon : "");
            div.appendChild(img);
            div.appendChild(a);
            list_item.appendChild(div);
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
