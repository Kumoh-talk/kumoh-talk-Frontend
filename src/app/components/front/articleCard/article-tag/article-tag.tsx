import clsx from 'clsx';
import styles from './article-tag.module.scss';

export type ArticleTagNameType =
  | 'study'
  | 'project'
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'security'
  | 'ai'
  | 'mentor';

export interface Props {
  name: ArticleTagNameType;
}

const nameMap: Record<ArticleTagNameType, string> = {
  study: '스터디',
  project: '프로젝트',
  frontend: '프론트',
  backend: '백엔드',
  mobile: '모바일',
  security: '보안',
  ai: '인공지능',
  mentor: '멘토링',
};

export default function ArticleTag({ name }: Props) {
  return <li className={clsx(styles.tag, styles[name])}>{nameMap[name]}</li>;
}
