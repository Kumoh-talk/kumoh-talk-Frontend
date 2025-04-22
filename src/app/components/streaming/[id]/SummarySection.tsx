import styles from './summarySection.module.scss';

interface Props {
  summary: string;
}

export default function SummarySection({ summary }: Props) {
  return <div className={styles.summary}>{summary}</div>;
}
