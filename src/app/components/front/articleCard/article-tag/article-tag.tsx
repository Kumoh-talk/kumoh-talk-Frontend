import clsx from 'clsx';
import styles from './article-tag.module.scss';
import { typeToText } from '@/app/lib/constants/tag/tagValues';

export interface Props {
  name: keyof typeof typeToText;
}

export default function ArticleTag({ name }: Props) {
  return <li className={clsx(styles.tag, styles[name])}>{typeToText[name]}</li>;
}
