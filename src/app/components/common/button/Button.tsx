import clsx from 'clsx';
import type { Color } from '@/app/lib/types/color';
import styles from './button.module.scss'

export interface Props {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: `bg-${Color}`;
  color?: `text-${Color}`;
  onClick: (...args: any[]) => unknown;
  children: React.ReactNode;
}

export default function Button({ className = '', size = 'small', bgColor = 'bg-blue-400', color = 'text-white', onClick, children }: Props) {
  return (
    <button className={clsx(
      styles.button,
      className,
      styles[size],
      styles[bgColor],
      styles[color],
    )} onClick={onClick}>{children}</button>
  )
}