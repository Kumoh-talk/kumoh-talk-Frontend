import clsx from 'clsx';
import type { Color } from '@/app/lib/types/color';
import styles from './button.module.scss';

type Props = {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: `bg-${Color}`;
  color?: `text-${Color}`;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    ...args: unknown[]
  ) => unknown;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className = '',
  size = 'small',
  bgColor = 'bg-blue-400',
  color = 'text-white',
  onClick = () => {},
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        styles.button,
        className,
        styles[size],
        styles[bgColor],
        styles[color]
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
