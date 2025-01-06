'use client';

import { createContext, useState } from 'react';

export const TabsContext = createContext<{
  state: {
    type: string;
    tag: string;
  };
  setState: (state: { type: string; tag: string }) => void;
}>({
  state: {
    type: 'study',
    tag: 'frontend',
  },
  setState: () => {},
});

export interface Props {
  children: React.ReactNode;
}

export function TabsProvider({ children }: Props) {
  const [state, setState] = useState({
    type: 'study',
    tag: 'frontend',
  });

  return (
    <TabsContext.Provider value={{ state, setState }}>
      {children}
    </TabsContext.Provider>
  );
}
