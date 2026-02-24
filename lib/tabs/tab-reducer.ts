export interface TabState {
	openTabs: string[];
	currentTab: string | null;
}

export type TabAction =
	| { type: "add"; tab: string }
	| { type: "remove"; tab: string }
	| { type: "activate"; tab: string | null }
	| { type: "replace"; targetTab: string; newTab: string };

export function reduceTab(state: TabState, action: TabAction): TabState {
	switch (action.type) {
		case "add": {
			if (action.tab === "home" || !action.tab) return state;
			if (state.openTabs.includes(action.tab)) return state;

			return {
				...state,
				openTabs: [...state.openTabs, action.tab],
			};
		}

		case "remove": {
			const newOpenTabs = state.openTabs.filter((t) => t !== action.tab);
			let newCurrentTab = state.currentTab;

			if (state.currentTab === action.tab) {
				if (newOpenTabs.length > 0) {
					newCurrentTab = newOpenTabs[newOpenTabs.length - 1];
				} else {
					newCurrentTab = null;
				}
			}

			return {
				openTabs: newOpenTabs,
				currentTab: newCurrentTab,
			};
		}

		case "activate": {
			return {
				...state,
				currentTab: action.tab === "home" ? null : action.tab,
			};
		}

		case "replace": {
			if (action.newTab === "home" || !action.newTab) {
				return reduceTab(state, { type: "remove", tab: action.targetTab });
			}

			const replaced = state.openTabs.map((t) =>
				t === action.targetTab ? action.newTab : t,
			);

			const seen = new Set<string>();
			const newOpenTabs = replaced.filter((t) => {
				if (seen.has(t)) return false;
				seen.add(t);
				return true;
			});

			let newCurrentTab = state.currentTab;
			if (state.currentTab === action.targetTab) {
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
