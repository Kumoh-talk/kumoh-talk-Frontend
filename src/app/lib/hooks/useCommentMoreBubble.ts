import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  deleteRecruitmentBoardComment,
  reportRecruitmentBoardComment,
} from '../apis/recruitment-boards/recruitmentBoard';

export default function useCommentMoreBubble(
  commentId: number,
  setIsEdit: Dispatch<SetStateAction<boolean>>
) {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const onModify = () => {
    setIsEdit(true);
    setIsOpen(false);
  };

  const onDelete = async () => {
    await deleteRecruitmentBoardComment(commentId);
    setIsOpen(false);
    window.location.reload();
  };

  const onReport = async () => {
    await reportRecruitmentBoardComment(commentId, 1);
    setIsOpen(false);
  };

  const onInsideClick = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClickOutside);
    } else {
      window.removeEventListener('click', onClickOutside);
    }

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [isOpen]);

  return { bubbleRef, isOpen, onModify, onDelete, onReport, onInsideClick };
}
