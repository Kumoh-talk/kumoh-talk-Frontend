import styles from './recruitmentBoardTitle.module.scss';
import HashTag from '@/app/components/recruitment-boards/[id]/HashTag';

export interface Props {
  title: string,
  type: string,
  tag: string,
}
// TODO: 백엔드 api 완성되면 수정
export function RecruitmentBoardTitle({ title, type, tag }: Props) {
  return (
    <div className={styles.titleBlock}>
      <div className={styles.title}>{title}</div>
      <div className={styles.tags}>
        <HashTag type={type} />
        <HashTag type={tag} />
      </div>
    </div>
  )
}