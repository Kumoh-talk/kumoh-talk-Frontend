import styles from './hashTag.module.scss';
import clsx from 'clsx';
import { typeToText } from '@/app/lib/constants/tag/tagValues';
import { RecruitmentTag } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export interface Props {
  type: RecruitmentTag;
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
