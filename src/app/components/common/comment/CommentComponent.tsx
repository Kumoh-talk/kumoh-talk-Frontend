import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import CommentInput from '@/app/components/common/comment/CommentInput';
import ShowAccountComment from '@/app/components/common/comment/ShowAccountComment';
import CommentList from '@/app/components/common/comment/CommentList';
import { getRecruitmentBoardComment } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import { CommentListApi } from '@/app/lib/types/comment/commentList';

export interface Props {
  boardId: string;
}

export default async function CommentComponent({ boardId }: Props) {
  const commentList: CommentListApi = await getRecruitmentBoardComment(boardId);

  if (!commentList.data) {
    <div>Loading...</div>;
  }

  return (
    <div className={styles.block}>
      <ShowAccountComment commentList={commentList.data} />
      <div className={styles.inputBlock}>
        <ProfileImage />
        <CommentInput boardId={boardId} />
      </div>
      <CommentList boardId={Number(boardId)} commentList={commentList.data} />
    </div>
  );
}
