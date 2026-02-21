import { useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { deserializeTab, serializeTab } from '@/lib/tabs/tab-utils';
import { TabAction, TabState, reduceTab } from '@/lib/tabs/tab-reducer';

export function useTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state: TabState = useMemo(() => {
    const rawOpenTab = searchParams.get('openTab');
    const rawCurrentTab = searchParams.get('currentTab');

    const currentTab = deserializeTab(rawCurrentTab || 'home');
    const openTabs = rawOpenTab
      ? rawOpenTab.split('|').map(deserializeTab)
      : [{ type: 'home' as const }];

    return { openTabs, currentTab };
  }, [searchParams]);
  const dispatch = useCallback(
    (...actions: TabAction[]) => {
      const nextState = actions.reduce(reduceTab, state);

      const nextOpenTabStr = nextState.openTabs.map(serializeTab).join('|');
      const nextCurrentTabStr = serializeTab(nextState.currentTab);

      const params = new URLSearchParams(searchParams.toString());
      params.set('openTab', nextOpenTabStr);
      params.set('currentTab', nextCurrentTabStr);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [state, router, pathname, searchParams]
  );

  return {
    state,
    dispatch,
  };
}
