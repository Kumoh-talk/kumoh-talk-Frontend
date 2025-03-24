import Header from '@/app/components/common/header/Header';
import styles from './page.module.scss';
import PostForm from '@/app/components/recruitment-boards/post/PostForm';
import { PostProvider } from '@/app/components/recruitment-boards/post/PostProvider';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PostBoard } from '@/app/lib/types/recruitmentBoards/post/postBoard';
import { getRecruitmentBoardInfo } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';

export default async function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!cookies().get('accessToken')) {
    notFound();
  }

  let defaultValues: PostBoard = {
    title: '',
    summary: '',
    host: '',
    content: '',
    type: 'STUDY',
    tag: 'FRONTEND',
    recruitmentTarget: '',
    recruitmentNum: 0,
    currentMemberNum: 0,
    recruitmentDeadline: '',
    activityStart: '',
    activityFinish: '',
    activityCycle: '',
  };

  if (searchParams.id) {
    const { data } = await getRecruitmentBoardInfo(searchParams.id);
    defaultValues = data;
    defaultValues.recruitmentDeadline =
      defaultValues.recruitmentDeadline.split('T')[0];
    defaultValues.activityStart = defaultValues.activityStart.split('T')[0];
    defaultValues.activityFinish = defaultValues.activityFinish.split('T')[0];
  }

  return (
    <div className={styles.page}>
      <Header title='모집글 작성' />
      <div className={styles.form}>
        <PostProvider boardId={searchParams.id}>
          <PostForm modifyId={searchParams.id} defaultValues={defaultValues} />
        </PostProvider>
      </div>
    </div>
  );
}
