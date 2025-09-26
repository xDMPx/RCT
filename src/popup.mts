import { getRctState } from "./utils.mjs";

async function main() {
    const state = await getRctState();
    const rct_div = document.getElementById("rctDiv");

    if (rct_div !== null) {
        const list = document.createElement("ol");
        for (const tab of state.removedTabs) {
            const list_item = document.createElement("li");
            list_item.innerText = (tab.url !== undefined ? tab.url : "");
            list.appendChild(list_item);
        }
        rct_div.appendChild(list);
    }
}


main();
