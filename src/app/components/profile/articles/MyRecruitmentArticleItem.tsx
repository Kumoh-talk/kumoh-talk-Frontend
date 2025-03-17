'use client';

import clsx from 'clsx';
import { typeToText } from '@/app/lib/constants/tag/tagValues';
import { RecruitmentArticle } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './myArticleItem.module.scss';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { removeRecruitmentArticle } from '@/app/lib/apis/recruitmentBoards';

export interface Props extends RecruitmentArticle {}

export default function MyRecruitmentArticleItem({
  type,
  boardId,
  title,
  recruitmentStart,
}: Props) {
  const router = useRouter();
  const onClickLink: MouseEventHandler = (e) => {
    router.push(
      `/recruitment-boards/detail?id=${boardId}&boardType=${type.toLowerCase()}`,
    );
  };
  const onClickEdit: MouseEventHandler = (e) => {
    e.stopPropagation();
  };
  const onClickDelete: MouseEventHandler = async (e) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        const res = await removeRecruitmentArticle(boardId);
        console.log(res);
        if (!res?.success) {
          throw new Error('삭제에 실패했습니다.');
        }

        alert('삭제되었습니다.');
        router.refresh();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('삭제에 실패했습니다.');
        return;
      }
    }
  };

  return (
    <li className={styles.item}>
      <button onClick={onClickLink}>
        <div className={styles.categoryWrapper}>
          <span
            className={clsx(styles.category, styles[type.toLocaleLowerCase()])}
          >
            {typeToText[type]}
          </span>
          <span className={styles.datetime}>
            {new Date(recruitmentStart).toLocaleDateString('en-CA')}
          </span>
        </div>
        <span className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>{' '}
        </span>
        <div className={styles.control}>
          {/* <button className={styles.controlButton} onClick={onClickEdit}>
            수정
          </button> */}
          <button className={styles.controlButton} onClick={onClickDelete}>
            삭제
          </button>
        </div>
      </button>
    </li>
  );
}
