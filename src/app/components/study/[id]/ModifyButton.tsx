"use client"

import styles from './boardButton.module.scss'

export default function ModifyButton() {
  const onModify = () => {};

  return (
    <button className={styles.button} onClick={onModify}>
      수정하기
    </button>
  )
}