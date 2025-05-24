import styles from './SeminarSummary.module.scss';

interface Props {
  summary: string;
}

export default function SeminarSummary({ summary }: Props) {
  return <div className={styles.summary}>{summary}</div>;
}
