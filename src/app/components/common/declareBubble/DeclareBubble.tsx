import styles from "./declareBubble.module.scss";
import LargeBubble from "@/app/components/common/largeBubble/LargeBubble";
import DeclareSvg from "@/app/assets/svg/DeclareSvg";

export default function DeClareBubble() {
  return (
    <LargeBubble>
      <div className={styles.textBlock}>
        <p className={styles.text}>신고하기</p>
        <DeclareSvg />
      </div>
    </LargeBubble>
  )
}