import SideBarArrow from '@/app/assets/svg/SideBarArrow';
import styles from './profileSideBar.module.scss';
import Link from 'next/link';
import CategoryList from './subList/CategoryList';

const categoryApplyList = [
  { link: '/profile/applies?category=study', label: '스터디' },
  { link: '/profile/applies?category=project', label: '프로젝트' },
  { link: '/profile/applies?category=mentoring', label: '멘토링' },
  // { link: '/profile/applies?category=seminar', label: '세미나 발표' },
];

const categoryArticleList = [
  { link: '/profile/articles?category=study', label: '스터디' },
  { link: '/profile/articles?category=project', label: '프로젝트' },
  { link: '/profile/articles?category=mentoring', label: '멘토링' },
  // { link: '/profile/articles?category=seminar', label: '세미나 발표' },
];

const categoryCommentList = [
  { link: '/profile/comments?category=study', label: '스터디' },
  { link: '/profile/comments?category=project', label: '프로젝트' },
  { link: '/profile/comments?category=mentoring', label: '멘토링' },
  // { link: '/profile/comments?category=seminar', label: '세미나 발표' },
];

export default function SubList() {
  return (
    <div className={styles.subList}>
      {/* <div className={styles.subRow}>
        <SideBarArrow />
        <Link href="/profile/applies?category=study" className={styles.link}>
          신청내역
        </Link>
        <CategoryList items={categoryApplyList} className={styles.category} />
      </div> */}
      <div className={styles.subRow}>
        <SideBarArrow />
        <Link href="/profile/articles?category=study" className={styles.link}>
          작성글
        </Link>
        <CategoryList items={categoryArticleList} className={styles.category} />
      </div>
      {/* <div className={styles.subRow}>
        <SideBarArrow />
        <Link href="/profile/comments?category=study" className={styles.link}>
          작성댓글
        </Link>
        <CategoryList items={categoryCommentList} className={styles.category} />
      </div> */}
    </div>
  );
}
