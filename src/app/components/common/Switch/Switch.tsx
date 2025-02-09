import * as React from 'react';
import clsx from 'clsx';
import { useSwitch, UseSwitchParameters } from '@mui/base/useSwitch';
import styles from './switch.module.scss';

export default function Switch(props: UseSwitchParameters) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = clsx({
    [styles.checked]: checked,
    [styles.disabled]: disabled,
    [styles.focusVisible]: focusVisible,
  });

  return (
    <span className={`${styles.root} ${stateClasses}`}>
      <span className={`${styles.thumb} ${stateClasses}`} />
      <input
        className={styles.input}
        {...getInputProps()}
        aria-label='required'
      />
    </span>
  );
}
