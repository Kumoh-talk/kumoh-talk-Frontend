"use client"

import styles from './applyButton.module.scss';

export default function ApplyButton() {
  const onApply = () => {};

  return (
    <button className={styles.button} onClick={onApply}>
      신청하기
    </button>
  )
}