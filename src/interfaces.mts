export interface RctStateRemovedTabs {
    removedTabs: TabInfo[],
    removedTabsArrayMaxSize: number,
}

export interface TabInfo {
    url: string | undefined,
    favicon: string | undefined,
    title: string | undefined
}
