export interface RctState {
    removedTabs: TabInfo[],
    removedTabsArrayMaxSize: number,
    tabs: Map<number, TabInfo>,
}

export interface LocalRctState {
    removedTabs: TabInfo[],
    removedTabsArrayMaxSize: number,
    tabs: [number, TabInfo][],
}

interface TabInfo {
    url: string | undefined,
    favicon: string | undefined,
    title: string | undefined
}


