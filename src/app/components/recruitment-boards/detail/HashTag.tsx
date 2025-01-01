import styles from './hashTag.module.scss';
import clsx from 'clsx';
import { typeToText } from '@/app/lib/constants/tag/tagValues';

export interface Props {
  type: string;
  size?: 'small' | 'large';
}

export default function HashTag({ type, size = 'large' }: Props) {
  return (
    <div
      className={clsx(
        styles.tag,
        styles[type?.toLocaleLowerCase()],
        styles[size]
      )}
    >
      {typeToText[type]}
    </div>
  );
}
