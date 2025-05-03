import Link from 'next/link';
import styles from './page.module.scss';
import PageMoreSvg from '../assets/svg/PageMoreSvg';
import StreamingCard from '../components/streaming/StreamingCard';

const streamingList = [
  {
    streamingId: 1,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
  {
    streamingId: 2,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
  {
    streamingId: 3,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
  {
    streamingId: 4,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
  {
    streamingId: 5,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
  {
    streamingId: 6,
    title: 'JPA란 무엇인가?',
    subTitle: 'JPA에 대한 세미나',
    presenter: '발표자',
    viewers: 5612,
  },
];

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Live</h2>
        <Link href='/vod-list'>
          VOD 다시보기
          <PageMoreSvg />
        </Link>
      </div>
      <div className={styles.streamingList}>
        {streamingList.map((streaming) => (
          <StreamingCard key={streaming.streamingId} {...streaming} />
        ))}
      </div>
    </div>
  );
}
