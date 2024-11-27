'use client'

import MoreSvg from '@/app/assets/svg/MoreSvg';
import styles from './comment.module.scss';
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import ModifyBubble from '@/app/components/common/modifyBubble/ModifyBubble';

interface Props {
  setIsEdit:  Dispatch<SetStateAction<boolean>>;
}

export default function MoreButton({ setIsEdit }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const onModify = () => {
    setIsEdit(true);
    setIsOpen(false);
  }

  const onDelete = () => {
    setIsOpen(false);
  }

  const onInsideClick = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (bubbleRef.current &&
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

  return (
    <div ref={bubbleRef}>
      <div className={styles.btn} onClick={onInsideClick}>
        <MoreSvg />
      </div>
      <div>
        {isOpen && <ModifyBubble onModify={onModify} onDelete={onDelete} />}
      </div>
    </div>
  )
}