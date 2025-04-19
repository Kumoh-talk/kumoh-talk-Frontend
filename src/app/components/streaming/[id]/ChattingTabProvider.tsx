'use client';

import { createContext, useState } from 'react';

export const ChattingTabContext = createContext<{
  tab: string;
  setTab: (tab: string) => void;
}>({
  tab: 'chatting',
  setTab: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ChattingTabProvider({ children }: Props) {
  const [tab, setTab] = useState('chatting');

  return (
    <ChattingTabContext.Provider value={{ tab, setTab }}>
      {children}
    </ChattingTabContext.Provider>
  );
}
