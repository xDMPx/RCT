export interface RctState {
    removedTabs: TabInfo[],
    removedTabsArrayMaxSize: number,
    tabs: Map<number, TabInfo>,
}

interface TabInfo {
    url: string | undefined,
    favicon: string | undefined
}


