'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import ApplyBanner from '@/app/components/front/applyBanner/ApplyBanner';
import { getFullDate } from '@/app/lib/utils/post/dateFormatter';
import { getBoard } from '@/app/lib/apis/notice/notice';
import styles from './Board.module.scss';

interface BoardProps {
  boardId: number;
}

interface BoardData {
  username: string;
  title: string;
  contents: string;
  boardHeadImageUrl?: string;
  view: number;
  categoryNames: string[];
  updatedAt: number[];
}

const Board = ({ boardId }: BoardProps) => {
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardResponse = await getBoard(boardId);

        if (boardResponse?.data) {
          setBoardData(boardResponse.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [boardId]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error || !boardData) {
    return <div>게시글 정보를 불러올 수 없습니다.</div>;
  }

  const { username, title, contents, view, categoryNames, updatedAt } =
    boardData;
  const sanitizedContent = DOMPurify.sanitize(contents);

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert('URL이 복사되었습니다.'))
      .catch(() => alert('URL 복사에 실패했습니다.'));
  };

  return (
    <div className={styles.noticeBoard}>
      <header>
        <div className={styles.logo}></div>
        <div className={styles.bannerWrapper}>
          <ApplyBanner />
        </div>
      </header>
      <article className={styles.articleContainer}>
        <h1 className={styles.articleTitle}>{title}</h1>
        <div className={styles.articleInfo}>
          <span className={styles.author}>{username}</span>
          <span className={styles.views}>조회수 {view}</span>
          <span className={styles.date}>{getFullDate(updatedAt)}</span>
          <button className={styles.url} type='button' onClick={handleCopyUrl}>
            URL 복사하기
          </button>
        </div>
        <hr className={styles.divider} />
        <div
          className={styles.contents}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className={styles.categoryNames}>
          {categoryNames.map((category) => (
            <span className={styles.category} key={category}>
              <span>#</span>
              <span>{category}</span>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Board;
