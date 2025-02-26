import styles from './declareBubble.module.scss';
import LargeBubble from '@/app/components/common/largeBubble/LargeBubble';
import DeclareSvg from '@/app/assets/svg/DeclareSvg';

export interface Props {
  onReport: () => void;
}

export default function DeClareBubble({ onReport }: Props) {
  return (
    <LargeBubble>
      <div className={styles.textBlock} onClick={onReport}>
        <p className={styles.text}>신고하기</p>
        <DeclareSvg />
      </div>
    </LargeBubble>
  );
}
