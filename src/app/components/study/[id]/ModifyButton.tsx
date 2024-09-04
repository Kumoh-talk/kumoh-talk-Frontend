'use client'

import styles from './boardButton.module.scss'
// TODO: 백엔드 api 완성되면 수정
export default function ModifyButton() {
  const onModify = () => {};

  return (
    <button className={styles.button} onClick={onModify}>
      수정하기
    </button>
  )
}