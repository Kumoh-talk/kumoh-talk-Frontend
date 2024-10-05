import styles from './hashTag.module.scss';
import clsx from 'clsx';

export interface Props {
  type: string;
  size?: 'small' | 'large';
}

export interface TagType {
  [key: string]: string;
}

const textObj: TagType = {
  STUDY: '스터디',
  PROJECT: '프로젝트',
  FRONT: '프론트',
  BACKEND: '백엔드',
  MOBILE: '모바일',
  SECURE: '보안',
  AI: '인공지능',
  MENTOR: '멘토링',
}

export default function HashTag({ type, size = 'large' }: Props) {
  return (
    <div className={clsx(styles.tag, styles[type.toLocaleLowerCase()], styles[size])}>{textObj[type]}</div>
  )
}