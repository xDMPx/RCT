export interface RctState {
    removedTabs: TabInfo[],
    removedTabsArrayMaxSize: number,
    tabs: Map<number, TabInfo>,
}

export interface TabInfo {
    url: string | undefined,
    favicon: string | undefined,
    title: string | undefined
}
