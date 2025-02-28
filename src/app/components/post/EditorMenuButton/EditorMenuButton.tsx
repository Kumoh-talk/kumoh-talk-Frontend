import clsx from 'clsx';
import styles from './EditorMenuButton.module.scss';

export interface ButtonProps {
  icon: (props: { className?: string }) => JSX.Element;
  command: () => void;
  isActive: () => boolean;
  disabled?: boolean;
}

export const EditorMenuButton = ({
  icon,
  command,
  isActive,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.editorMenuButton, {
        [styles.active]: isActive(),
        [styles.disabled]: disabled,
      })}
      type='button'
      onClick={command}
      disabled={disabled}
    >
      {icon({ className: styles.icon })}
    </button>
  );
};
