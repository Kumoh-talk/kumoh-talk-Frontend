import Link from 'next/link';
import clsx from 'clsx';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import ScrollableList from '../../../scrollableList/ScrollableList';
import ArticleCard from '../../../articleCard/ArticleCard';
import { getRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';
import {
  RecruitmentArticle,
  RecruitmentType,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './articleSection.module.scss';

const iga = (str: string) => {
  const last = str.charCodeAt(str.length - 1) - 44032;
  return last % 28 !== 0 ? '이' : '가';
};

export default async function ArticleSection({
  title,
  category,
  size = 'normal',
}: {
  title: string;
  category: RecruitmentType;
  size?: 'large' | 'normal';
}) {
  const listData: RecruitmentArticle[] = [];
  try {
    const res = await getRecruitmentArticlesByPage(category);
    listData.push(...(res?.pageContents ?? []));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const list =
    listData.length > 0 ? (
      listData.map((article) => (
        <ArticleCard key={article.boardId} size={size} {...article} />
      ))
    ) : (
      <div className={styles.noArticle}>
        진행중인 {title}
        {iga(title)} 없습니다.
      </div>
    );
  return (
    <section className={styles.card}>
      <header>
        <span>{title}</span>
        <Link href={`/recruitment-boards?category=${category.toLowerCase()}`}>
          더 보기
          <PageMoreSvg />
        </Link>
      </header>
      <ScrollableList size={size}>
        <ul
          className={clsx(styles.cardList, styles[size], {
            [styles.noArticle]: listData.length === 0,
          })}
        >
          {list}
        </ul>
      </ScrollableList>
    </section>
  );
}
