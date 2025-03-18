'use client';

import clsx from 'clsx';
import styles from './categoryButton.module.scss';
import { useFormContext } from 'react-hook-form';

export interface Props {
  content: string;
  type: 'type' | 'tag';
  children: React.ReactNode;
}

export default function CategoryButton({ content, type, children }: Props) {
  const { watch, setValue } = useFormContext();
  const isSelected = watch(type) === content;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue(type, content);
  };

  return (
    <button
      className={clsx(
        styles.button,
        isSelected && styles[content.toLowerCase()]
      )}
      onClick={onClick}
    >
      <input type='hidden' name={type} value={content} />
      {children}
    </button>
  );
}
