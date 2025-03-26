import styles from './page.module.scss';
import Comment from '@/app/components/common/comment/CommentComponent';
import { Suspense } from 'react';
import RecruitmentBoardDetail from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetail';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import {
  getRecruitmentBoardDetail,
  matchRecruitmentTitle,
} from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import { notFound } from 'next/navigation';
import { UserInfo } from '@/app/lib/types/user/userInfo';
import { getUserInfo } from '@/app/lib/apis/user';
import { cookies } from 'next/headers';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    id: string;
    boardType: string;
  };
}) {
  const { id, boardType } = searchParams;
  const titleFromBoardType = matchRecruitmentTitle(boardType);
  const boardDetail: RecruitmentBoardsApi = await getRecruitmentBoardDetail(id);

  if (!boardDetail.data) {
    return {
      title: `야밤의금오톡`,
      description: `야밤의금오톡`,
      openGraph: {
        title: `야밤의금오톡`,
        description: `야밤의금오톡`,
        images: ['/images/logo_thumbnail.png'],
      },
    };
  }

  const boardTitle = boardDetail.data.title;
  const metaTitle = `야밤의금오톡 : ${boardTitle}`;
  const metaDescription = boardDetail.data.summary;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ['/images/logo_thumbnail.webp'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; boardType: string };
}) {
  const title = matchRecruitmentTitle(searchParams.boardType);
  const UserInfoResponse = await getUserInfo(cookies().toString());
  const userInfo: UserInfo = (await UserInfoResponse.json()).data;
  const boardDetail: RecruitmentBoardsApi = await getRecruitmentBoardDetail(
    searchParams.id
  );

  if (!boardDetail.data) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <Header title={title} />
      <main className={styles.board}>
        <Suspense fallback={<p>Loading...</p>}>
          <RecruitmentBoardDetail
            boardDetail={boardDetail}
            userId={userInfo?.id}
            writerUserId={boardDetail.data.userId}
            boardId={searchParams.id}
          />
        </Suspense>
        <Comment boardId={searchParams.id} />
      </main>
      <Footer />
    </div>
  );
}
