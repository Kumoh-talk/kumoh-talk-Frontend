import {
  RecruitmentArticle,
  RecruitmentType,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import ArticleItem from './ArticleItem';
import ArticleOrder from './ArticleOrder';
import CategoryList from './CategoryList';
import Pagination from './Pagination';
import styles from './articleList.module.scss';
import { getRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';
import Link from 'next/link';
import { getUserInfo } from '@/app/lib/apis/user';
import { cookies } from 'next/headers';
import clsx from 'clsx';

export default async function ArticleList({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  const listData: RecruitmentArticle[] = [];
  let isCanPost = false;

  // fetch articles
  try {
    const category = (searchParams.category?.toUpperCase() ??
      'MENTORING') as RecruitmentType;
    const page = parseInt(searchParams.page ?? '1');

    const res = await getRecruitmentArticlesByPage(category, page);
    listData.push(...(res?.pageContents ?? []));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // fetch user info
  try {
    const userInfoResponse = await getUserInfo(cookies().toString());
    const userInfo = (await userInfoResponse.json()).data;
    isCanPost =
      userInfo?.role === 'ROLE_ACTIVE_USER' || userInfo?.role === 'ROLE_USER';
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const list =
    listData.length > 0 ? (
      listData.map((article) => (
        <ArticleItem key={article.boardId} {...article} />
      ))
    ) : (
      <div className={styles.noArticle}>게시글이 없습니다</div>
    );
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <CategoryList searchParams={searchParams} />
        <ArticleOrder />
      </div>
      <ul className={styles.list}>{list}</ul>
      <div className={clsx(styles.bottom, { [styles.isGuest]: !isCanPost })}>
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}
