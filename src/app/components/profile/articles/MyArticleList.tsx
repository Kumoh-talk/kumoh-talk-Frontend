import {
  RecruitmentArticle,
  RecruitmentType,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import { getMyRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';
import { getUserInfo } from '@/app/lib/apis/user';
import { cookies } from 'next/headers';
import clsx from 'clsx';
import Pagination from '../../articles/Pagination';
import { BoardArticle, BoardType } from '@/app/lib/types/board/board';
import { getMyBoardArticles } from '@/app/lib/apis/boards';
import MyRecruitmentArticleItem from './MyRecruitmentArticleItem';
import MyBoardArticleItem from './MyBoardArticleItem';
import SideBarArrow from '@/app/assets/svg/SideBarArrow';
import styles from './myArticleList.module.scss';

const typeName = {
  STUDY: '스터디',
  PROJECT: '프로젝트',
  MENTORING: '멘토링',
  NOTICE: '공지사항',
  SEMINAR: '세미나',
};

export default async function MyArticleList({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  const listData: (RecruitmentArticle | BoardArticle)[] = [];
  let isCanPost = false;
  let type = 'RECRUITMENT';

  const cookie = cookies();

  const category = (searchParams.category?.toUpperCase() ?? 'STUDY') as
    | RecruitmentType
    | BoardType;
  const page = parseInt(searchParams?.page ?? '1');
  // fetch articles
  try {
    if (['STUDY', 'PROJECT', 'MENTORING'].includes(category)) {
      const res = await getMyRecruitmentArticlesByPage(
        category as RecruitmentType,
        page,
        15,
        cookie.get('accessToken')?.value!,
        cookie.get('refreshToken')?.value!,
      );
      listData.push(...(res?.pageContents ?? []));
      type = 'RECRUITMENT';
    } else {
      const res = await getMyBoardArticles(
        category as BoardType,
        page,
        15,
        cookie.get('accessToken')?.value!,
        cookie.get('refreshToken')?.value!,
      );
      listData.push(...(res ?? []));
      type = 'BOARD';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // fetch user info
  try {
    const userInfoResponse = await getUserInfo(cookies().toString());
    const userInfo = (await userInfoResponse.json()).data;
    isCanPost = userInfo?.role === 'ROLE_USER';
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const list =
    listData.length > 0 ? (
      type === 'RECRUITMENT' ? (
        listData.map((article) => (
          <MyRecruitmentArticleItem
            key={article.boardId}
            {...(article as RecruitmentArticle)}
          />
        ))
      ) : (
        listData.map((article) => (
          <MyBoardArticleItem
            key={article.boardId}
            {...(article as BoardArticle)}
          />
        ))
      )
    ) : (
      <div className={styles.noArticle}>작성한 게시글이 없습니다</div>
    );
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        작성글
        <SideBarArrow /> {typeName[category]}
      </h1>
      <ul className={styles.list}>{list}</ul>
      <div className={clsx(styles.bottom, { [styles.isGuest]: !isCanPost })}>
        <div className={styles.dummy}></div>
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}
