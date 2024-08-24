import styles from './comment.module.scss'

export interface Props {
  placeholder: string;
}

export default function CommentInput({placeholder}: Props) {
  return (
    <input className={styles.input} placeholder={placeholder}/>
  )
}