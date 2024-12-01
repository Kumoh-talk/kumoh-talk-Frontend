import NoticeCard, { Props } from '../../noticeCard/NoticeCard';
import styles from './tabContentNotice.module.scss';

const dummylist: Props[] = [
  {
    title: '야밤의 금오톡 제 5회 공고',
    author: '관리자',
    date: new Date(),
    articleId: '8',
    thumbnail: '',
  },
  {
    title: '야밤의 금오톡 제 4회 공고',
    author: '관리자',
    date: new Date(),
    articleId: '7',
    thumbnail: '',
  },
  {
    title: '야밤의 금오톡 제 3회 공고',
    author: '관리자',
    date: new Date(),
    articleId: '6',
    thumbnail: '',
  },
  {
    title: '야밤의 금오톡 제 2회 공고',
    author: '관리자',
    date: new Date(),
    articleId: '5',
    thumbnail: '',
  },
  {
    title: '야밤의 금오톡 제 1회 공고',
    author: '관리자',
    date: new Date(),
    articleId: '4',
    thumbnail: '',
  },
  {
    title: '공지사항 제목 어쩌구저쩌구',
    author: '관리자',
    date: new Date(),
    articleId: '3',
    thumbnail: '',
  },
  {
    title: '공지사항 제목 어쩌구저쩌구',
    author: '관리자',
    date: new Date(),
    articleId: '2',
    thumbnail: '',
  },
  {
    title: '공지사항 제목 어쩌구저쩌구',
    author: '관리자',
    date: new Date(),
    articleId: '1',
    thumbnail: '',
  },
];
export default function TabContentNotice() {
  const list = dummylist.map((props) => (
    <NoticeCard key={props.articleId} {...props} />
  ));
  return (
    <section className={styles.notice}>
      <ul className={styles.list}>{list}</ul>
    </section>
  );
}
