import styles from './modifyBubble.module.scss';
import LargeBubble from "@/app/components/common/largeBubble/LargeBubble";
import TrashSvg from '@/app/assets/svg/TrashSvg';
import WriteSvg from '@/app/assets/svg/WriteSvg';

export interface Props {
  onModify?: () => void;
  onDelete?: () => void;
}

export default function ModifyBubble({ onModify = () => {}, onDelete = () => {} }: Props) {
  return (
    <LargeBubble>
      <div className={styles.textBlock} onClick={onModify}>
        <p className={styles.modifyText}>수정하기</p>
        <WriteSvg/>
      </div>
      <div className={styles.textBlock} onClick={onDelete}>
        <p className={styles.deleteText}>삭제하기</p>
        <TrashSvg/>
      </div>
    </LargeBubble>
  )
};