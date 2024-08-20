import styles from "./largeBubble.module.scss";

export interface Props {
  children: React.ReactNode;
}

export default function LargeBubble({ children }: Props) {
  return (
    <div className={styles.bubble}>
      <div className={styles.textBlock}>
        {children}
      </div>
    </div>
  )
}