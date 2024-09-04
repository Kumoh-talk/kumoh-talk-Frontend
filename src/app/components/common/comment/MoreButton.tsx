'use client'

import MoreSvg from "@/app/assets/svg/MoreSvg";
import DeClareBubble from "@/app/components/common/declareBubble/DeclareBubble";
import styles from './comment.module.scss';
import {useState} from "react";
import ModifyBubble from "@/app/components/common/modifyBubble/ModifyBubble";

// TODO: 백엔드 api 완성되면 수정
export default function MoreButton() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <div className={styles.btn} onClick={() => setIsShow(!isShow)}>
        <MoreSvg />
      </div>
      {isShow && <ModifyBubble />}
    </div>
  )
}