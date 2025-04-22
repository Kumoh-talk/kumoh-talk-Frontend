import Link from 'next/link';
import styles from './page.module.scss';
import PageMoreSvg from '../assets/svg/PageMoreSvg';
import VodCard from '../components/vod-list/VodCard';

const VodList = [
  {
    vodId: 1,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
  {
    vodId: 2,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
  {
    vodId: 3,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
  {
    vodId: 4,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
  {
    vodId: 5,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
  {
    vodId: 6,
    title: 'JPA란 무엇인가?',
    cam_url: 'http://localhost:8080/vod/1',
    slide_url: 'http://localhost:8080/vod/1',
    length: '00:24:00',
    episode: 1,
    summary: 'JPA에 대한 세미나',
    presenter: '발표자',
    views: 5612,
  },
];

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>VOD 다시보기</h2>
        <Link href='/streaming'>
          Live 스트리밍
          <PageMoreSvg />
        </Link>
      </div>
      <div className={styles.vodList}>
        {VodList.map((vod) => (
          <VodCard key={vod.vodId} {...vod} />
        ))}
      </div>
    </div>
  );
}
