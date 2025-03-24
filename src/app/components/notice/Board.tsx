'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import ApplyBanner from '@/app/components/front/applyBanner/ApplyBanner';
import MoreVerticalSvg from '@/app/assets/svg/Editor/MoreVerticalSvg';
import ModifyBubble from '@/app/components/common/modifyBubble/ModifyBubble';
import { getFullDate } from '@/app/lib/utils/post/dateFormatter';
import {
  getBoard,
  getMyInformation,
  deleteBoard,
} from '@/app/lib/apis/notice/notice';
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
  const [showBubble, setShowBubble] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const toggleBubble = () => {
    setShowBubble((prev) => !prev);
  };

  const handleModify = async () => {
    router.push(`/post?boardId=${boardId}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');

    if (confirmed) {
      try {
        await deleteBoard(boardId);
        alert('게시글이 삭제되었습니다.');
        router.push('/');
      } catch (err) {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    const fetchBoardData= async () => {
      try {
        const boardResponse = await getBoard(boardId);
        const userResponse = await getMyInformation();

        if (boardResponse?.data) {
          setBoardData(boardResponse.data);
        } else {
          setError(true);
        }

        if (userResponse?.data?.role === 'ROLE_ADMIN') {
          setIsAdmin(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

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
          <button
            className={styles.moreVertical}
            type='button'
            onClick={toggleBubble}
          >
            <MoreVerticalSvg />
            {showBubble && isAdmin && (
              <div className={styles.modifyBubble}>
                <ModifyBubble
                  onModify={handleModify}
                  onDelete={handleDelete}
                />
              </div>
            )}
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
