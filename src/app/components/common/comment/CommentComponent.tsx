import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import CommentInput from '@/app/components/common/comment/CommentInput';
import ShowAccountComment from '@/app/components/common/comment/ShowAccountComment';
import CommentList from '@/app/components/common/comment/CommentList';
import { getRecruitmentBoardComment } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { CommentListApi } from '@/app/lib/types/comment/commentList';
import { getUserInfo } from '@/app/lib/apis/user';
import { cookies } from 'next/headers';
import { UserInfoResponse } from '@/app/lib/types/user/userInfo';

export interface Props {
  boardId: string;
}

export default async function CommentComponent({ boardId }: Props) {
  const commentList: CommentListApi = await getRecruitmentBoardComment(boardId);
  const userInfoFetch = await getUserInfo(cookies().toString());
  const userInfoResponse: UserInfoResponse = await userInfoFetch.json();
  const userInfo = userInfoResponse?.data;

  if (!commentList.data) {
    <div>Loading...</div>;
  }

  return (
    <div className={styles.block}>
      <ShowAccountComment commentList={commentList.data} />
      <div className={styles.inputBlock}>
        <ProfileImage profileImageUrl={userInfo?.profileImageUrl} />
        <CommentInput boardId={boardId} />
      </div>
      <CommentList
        userName={userInfo?.nickname}
        boardId={Number(boardId)}
        commentList={commentList.data}
      />
    </div>
  );
}
