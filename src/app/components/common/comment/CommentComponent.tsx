import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './comment.module.scss';
import CommentInput from '@/app/components/common/comment/CommentInput';
import { CommentListProvider } from '@/app/components/common/comment/CommentListProvider';
import ShowAccountComment from '@/app/components/common/comment/ShowAccountComment';
import CommentList from '@/app/components/common/comment/CommentList';

export default function CommentComponent() {
  return (
    <div className={styles.block}>
      <CommentListProvider>
        <ShowAccountComment/>
        <div className={styles.inputBlock}>
          <ProfileImage/>
          <CommentInput/>
        </div>
        <CommentList/>
      </CommentListProvider>
    </div>
  )
}