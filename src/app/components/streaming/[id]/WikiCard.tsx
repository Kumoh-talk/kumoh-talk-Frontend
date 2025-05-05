import styles from './wikiCard.module.scss';

interface Props {
  info: {
    wiki: string;
    general: string;
    expert: string;
  };
}

export default function WikiCard({ info }: Props) {
  const { wiki, general, expert } = info;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{wiki}</h2>
      </div>
      <div className={styles.generalWrapper}>
        <h3 className={styles.subTitle}>쉬운 설명</h3>
        <span>{general}</span>
      </div>
      <div className={styles.expertWrapper}>
        <h3 className={styles.subTitle}>상세 설명</h3>
        <span>{expert}</span>
      </div>
    </div>
  );
}
