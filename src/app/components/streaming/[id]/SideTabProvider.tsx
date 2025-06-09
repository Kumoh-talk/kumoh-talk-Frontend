'use client';

import { createContext, useState } from 'react';

export const SideTabContext = createContext<{
  tab: string;
  setTab: (tab: any) => void;
  isSubVideoVisible: boolean;
  setIsSubVideoVisible: (isSubVideoVisible: any) => void;
}>({
  tab: 'chatting',
  setTab: () => {},
  isSubVideoVisible: true,
  setIsSubVideoVisible: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function SideTabProvider({ children }: Props) {
  const [tab, setTab] = useState('chatting');
  const [isSubVideoVisible, setIsSubVideoVisible] = useState(true);

  return (
    <SideTabContext.Provider
      value={{ tab, setTab, isSubVideoVisible, setIsSubVideoVisible }}
    >
      {children}
    </SideTabContext.Provider>
  );
}
