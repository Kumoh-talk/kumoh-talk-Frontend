import styles from './page.module.scss';
import SideTabProvider from '@/app/components/streaming/[id]/SideTabProvider';
import VideoStreaming from '@/app/components/streaming/[id]/VideoStreaming';
import UtilityTab from '@/app/components/streaming/[id]/UtilityTab';
import { getVodDetail } from '@/app/lib/apis/vod/vod';
import BookmarkSection from '@/app/components/vod-list/[id]/BookmarkSection';
import { VodDetail } from '@/app/lib/types/streaming/vod';

const chatList = [
  {
    chatId: 0,
    socketId: 0,
    name: '자바스크립트최고',
    content: 'JPA란 무엇인가요?',
    time: '02:13',
  },
  {
    chatId: 1,
    socketId: 1,
    name: '제이피에이비씨디',
    content: 'JPA가 너무 궁금했는데 발표 기대할게요',
    time: '02:14',
  },
  {
    chatId: 2,
    socketId: 2,
    name: '파이썬키스트',
    content: '오렌지주스 마시면서 들어야지',
    time: '03:51',
  },
  {
    chatId: 3,
    socketId: 3,
    name: '자바칩프라푸치노',
    content: '오늘도 달달한 자바 한잔',
    time: '03:23',
  },
  {
    chatId: 4,
    socketId: 4,
    name: '이런씨플플',
    content: '자바 너무 어려운 것 같아요',
    time: '04:11',
  },
  {
    chatId: 5,
    socketId: 5,
    name: '러스트라이앵글',
    content: 'ㅋ',
    time: '06:23',
  },
  {
    chatId: 6,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 7,
    socketId: 7,
    name: '코틀리니지',
    content: '악의적 사용자 제제좀요 ㅠ',
    time: '08:30',
  },
  {
    chatId: 8,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 9,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 10,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 11,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 12,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 13,
    socketId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
];

const bookmarkList = [
  {
    bookmarkId: 0,
    userId: 0,
    vodId: 0,
    title: 'JPA 목차',
    time: '02:13',
  },
  {
    bookmarkId: 1,
    userId: 1,
    vodId: 1,
    title: 'JDBC에 대해서',
    time: '05:40',
  },
];

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const vodDetail = (await getVodDetail(id)) as VodDetail;

  return (
    <div className={styles.container}>
      <div className={styles.streamingWrapper}>
        <VideoStreaming
          camUrl={vodDetail.camUrl}
          camTsQuery={vodDetail.camTsQuery}
          slideUrl={vodDetail.slideUrl}
          slideTsQuery={vodDetail.slideTsQuery}
        />
        <div className={styles.streamingTitle}>JPA란 무엇인가?</div>
      </div>
      <div className={styles.sideTapWrapper}>
        <SideTabProvider>
          <div className={styles.chattingSection}>
            <BookmarkSection bookmarkList={bookmarkList} />
            <UtilityTab />
          </div>
        </SideTabProvider>
      </div>
    </div>
  );
}
