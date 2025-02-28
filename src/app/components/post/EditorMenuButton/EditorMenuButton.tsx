import clsx from 'clsx';
import styles from './EditorMenuButton.module.scss';

export interface ButtonProps {
  icon: (props: { className?: string }) => JSX.Element;
  command: () => void;
  isActive: () => boolean;
}

export const EditorMenuButton = ({ icon, command, isActive }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.editorMenuButton, {
        [styles.active]: isActive(),
      })}
      type='button'
      onClick={command}
    >
      {icon({ className: styles.icon })}
    </button>
  );
};
