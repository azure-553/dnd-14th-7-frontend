import { Tab, serializeTab } from './tab-utils';

export interface TabState {
  openTabs: Tab[];
  currentTab: Tab;
}

export type TabAction =
  | { type: 'add'; tab: Tab }
  | { type: 'remove'; tab: Tab }
  | { type: 'activate'; tab: Tab }
  | { type: 'replace'; targetTab: Tab; newTab: Tab };

export function reduceTab(state: TabState, action: TabAction): TabState {
  switch (action.type) {
    case 'add': {
      const addedKey = serializeTab(action.tab);
      const exists = state.openTabs.some(t => serializeTab(t) === addedKey);
      
      if (exists) return state;

      return {
        ...state,
        openTabs: [...state.openTabs, action.tab],
      };
    }

    case 'remove': {
      const targetKey = serializeTab(action.tab);
      const newOpenTabs = state.openTabs.filter(t => serializeTab(t) !== targetKey);
      
      let newCurrentTab = state.currentTab;

      if (serializeTab(state.currentTab) === targetKey) {
        if (newOpenTabs.length > 0) {
          newCurrentTab = newOpenTabs[newOpenTabs.length - 1];
        } else {
          newCurrentTab = { type: 'home' };
        }
      }
      if (newOpenTabs.length === 0) {
        return {
          openTabs: [{ type: 'home' }],
          currentTab: { type: 'home' },
        };
      }

      return {
        openTabs: newOpenTabs,
        currentTab: newCurrentTab,
      };
    }

    case 'activate': {
      return {
        ...state,
        currentTab: action.tab,
      };
    }

    case 'replace': {
      const targetKey = serializeTab(action.targetTab);
      const newOpenTabs = state.openTabs.map(t => 
        serializeTab(t) === targetKey ? action.newTab : t
      );
      
      let newCurrentTab = state.currentTab;
      if (serializeTab(state.currentTab) === targetKey) {
        newCurrentTab = action.newTab;
      }
      
      return {
        openTabs: newOpenTabs,
        currentTab: newCurrentTab,
      };
    }

    default:
      return state;
  }
}
