'use client';

import clsx from 'clsx';
import styles from './categoryButton.module.scss';
import { textToType } from '@/app/lib/constants/tag/tagValues';
import { useContext } from 'react';
import { TabsContext } from './TabsProvider';

export interface Props {
  content: string;
  type: 'type' | 'tag';
}

export default function CategoryButton({ content, type }: Props) {
  const { state, setState } = useContext(TabsContext);
  const value = textToType[content as keyof typeof textToType].toLowerCase();
  const isSelected = state.type === value || state.tag === value;

  const onClick = () => {
    setState({
      ...state,
      [type]: value,
    });
  };

  return (
    <button
      className={clsx(styles.button, isSelected && styles[value])}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
