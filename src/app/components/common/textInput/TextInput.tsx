'use client'

import styles from './textInput.module.scss';

export interface Props {
  type: string;
  placeholder: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

export default function TextInput({ type, placeholder, name, onChange = (e) => {}, required }: Props) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} name={name} onChange={onChange} required={required} />
  )
}