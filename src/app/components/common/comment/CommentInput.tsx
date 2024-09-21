import styles from './comment.module.scss'
import { ChangeEvent, KeyboardEvent } from 'react';

export interface Props {
  placeholder: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function CommentInput({ placeholder, name , onChange = (e) => {}, onKeyDown = (e) => {} }: Props) {
  return (
    <input className={styles.input} placeholder={placeholder} name={name} onChange={onChange} onKeyDown={onKeyDown} />
  )
}