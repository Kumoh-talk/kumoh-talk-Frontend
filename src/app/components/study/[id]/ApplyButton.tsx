"use client"

import styles from './boardButton.module.scss';

export default function ApplyButton() {
  const onApply = () => {};

  return (
    <button className={styles.button} onClick={onApply}>
      신청하기
    </button>
  )
}