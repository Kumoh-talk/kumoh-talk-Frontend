'use client'

import styles from './boardButton.module.scss';
// TODO: 백엔드 api 완성되면 수정
export default function ApplyButton() {
  const onApply = () => {};

  return (
    <button className={styles.button} onClick={onApply}>
      신청하기
    </button>
  )
}