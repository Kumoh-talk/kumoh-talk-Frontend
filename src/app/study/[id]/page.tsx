import {StudyAndProjectTitle} from "@/app/components/study/[id]/StudyAndProjectTitle";
import styles from './page.module.scss';
import StudyAndProjectContent from "@/app/components/study/[id]/StudyAndProjectContent";
import ApplyButton from "@/app/components/study/[id]/ApplyButton";
import ModifyButton from "@/app/components/study/[id]/ModifyButton";
import Comment from "@/app/components/common/comment/CommentComponent";

// TODO: 백엔드 api 완성되면 수정
export default function Page() {
  return (
    <main className={styles.board}>
      <StudyAndProjectTitle/>
      <StudyAndProjectContent/>
      <div className={styles.buttonBlock}>
        <ApplyButton/>
      </div>
      <div className={styles.buttonBlock}>
        <ModifyButton/>
      </div>
      <Comment />
    </main>
  )
}