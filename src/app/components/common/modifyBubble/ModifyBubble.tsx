import styles from './modifyBubble.module.scss';
import LargeBubble from "@/app/components/common/largeBubble/LargeBubble";
import TrashSvg from "@/app/assets/svg/TrashSvg";
import WriteSvg from "@/app/assets/svg/WriteSvg";

export default function ModifyBubble() {
  return (
    <LargeBubble>
      <div className={styles.textBlock}>
        <p className={styles.modifyText}>수정하기</p>
        <WriteSvg />
      </div>
      <div className={styles.textBlock}>
        <p className={styles.deleteText}>삭제하기</p>
        <TrashSvg />
      </div>
    </LargeBubble>
  )
};