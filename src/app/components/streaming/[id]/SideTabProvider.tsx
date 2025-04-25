'use client';

import { createContext, useState } from 'react';

export const SideTabContext = createContext<{
  tab: string;
  setTab: (tab: string) => void;
}>({
  tab: 'chatting',
  setTab: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function SideTabProvider({ children }: Props) {
  const [tab, setTab] = useState('chatting');

  return (
    <SideTabContext.Provider value={{ tab, setTab }}>
      {children}
    </SideTabContext.Provider>
  );
}
