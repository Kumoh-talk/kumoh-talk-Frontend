'use client';

import CloseSmallSvg from '@/app/assets/svg/CloseSmallSvg';
import styles from './closeButton.module.scss';

export interface Props {
  onClick: () => void;
}

export default function CloseButton({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <CloseSmallSvg />
    </button>
  );
}
