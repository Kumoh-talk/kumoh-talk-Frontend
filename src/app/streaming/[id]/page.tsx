import styles from './page.module.scss';
import ChattingTabs from '@/app/components/streaming/[id]/ChattingTabs';
import ChattingTabProvider from '@/app/components/streaming/[id]/ChattingTabProvider';
import ChattingList from '@/app/components/streaming/[id]/ChattingList';
import ChattingInput from '@/app/components/streaming/[id]/ChattingInput';
import VideoStreaming from '@/app/components/streaming/[id]/VideoStreaming';

const chatList = [
  {
    chatId: 0,
    name: '자바스크립트최고',
    content: 'JPA란 무엇인가요?',
    time: '02:13',
  },
  {
    chatId: 1,
    name: '제이피에이비씨디',
    content: 'JPA가 너무 궁금했는데 발표 기대할게요',
    time: '02:14',
  },
  {
    chatId: 2,
    name: '파이썬키스트',
    content: '오렌지주스 마시면서 들어야지',
    time: '03:51',
  },
  {
    chatId: 3,
    name: '자바칩프라푸치노',
    content: '오늘도 달달한 자바 한잔',
    time: '03:23',
  },
  {
    chatId: 4,
    name: '이런씨플플',
    content: '자바 너무 어려운 것 같아요',
    time: '04:11',
  },
  {
    chatId: 5,
    name: '러스트라이앵글',
    content: 'ㅋ',
    time: '06:23',
  },
  {
    chatId: 6,
    name: '카멜레온케이스',
    content:
      '자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액 자바 어려워 빼애애애애액',
    time: '08:20',
  },
  {
    chatId: 7,
    name: '코틀리니지',
    content: '악의적 사용자 제제좀요 ㅠ',
    time: '08:30',
  },
];

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.streamingWrapper}>
        <div className={styles.streamingTitle}>JPA란 무엇인가?</div>
        <VideoStreaming />
        <div className={styles.caption}>
          안녕하세요. 저는 JPA란 무엇인가?에 대해서 발표하게 된 김컴공입니다.
        </div>
        <div className={styles.summaryWrapper}>
          <div className={styles.summary}>
            JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고
            유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate
            등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과
            결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨.
          </div>
        </div>
      </div>
      <div className={styles.sideTapWrapper}>
        <div className={styles.subVideo}>보조화면</div>
        <ChattingTabProvider>
          <div className={styles.chattingWrapper}>
            <ChattingTabs />
          </div>
          <div className={styles.chattingSection}>
            <ChattingList chatList={chatList} />
            <ChattingInput />
          </div>
        </ChattingTabProvider>
      </div>
    </div>
  );
}
