import { useState } from 'react';
import clsx from 'clsx';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import Button from '../../common/button/Button';
import PlusSvg from '@/app/assets/svg/Editor/PlusSvg';
import MinusSvg from '@/app/assets/svg/Editor/MinusSvg';
import styles from './Publish.module.scss';

interface PublishProps {
  close: () => void;
}

const Publish = ({ close }: PublishProps) => {
  const { boardId, title, tagList, boardHeadImageUrl, setBoardHeadImageUrl } =
    usePostContent();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setBoardHeadImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const deleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setBoardHeadImageUrl('');
  };

  return (
    <>
      <div className={styles.head}>
        <h3>발행</h3>
      </div>
      <div className={styles.publish}>
        <div className={styles.infoContainer}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.tagList}>
            {tagList.length > 0 ? (
              tagList.map((tag) => (
                <span className={styles.text_tag} key={tag}>
                  <span>#</span>
                  <span>{tag}</span>
                </span>
              ))
            ) : (
              <span>#</span>
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.name}>URL</p>
            <p className={styles.detail}>
              {boardId === null
                ? 'URL은 임시 저장 이후 확인하실 수 있습니다'
                : `https://kumoh-talk.com/notice/${boardId}`}
            </p>
          </div>
        </div>
        <label className={styles.headImage}>
          <input
            type='file'
            accept='image/*'
            hidden
            onChange={handleImageChange}
          />
          {boardHeadImageUrl ? (
            <img
              className={styles.previewImage}
              src={boardHeadImageUrl}
              alt='대표 이미지 미리보기'
            />
          ) : (
            <>
              <PlusSvg />
              <span>대표 이미지 추가</span>
            </>
          )}
          <button
            className={clsx(styles.minusButton, {
              [styles.show]: boardHeadImageUrl,
            })}
            onClick={deleteImage}
          >
            <MinusSvg />
          </button>
        </label>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.outlineButton}
          size='medium'
          color='text-black-50'
          bgColor='bg-white'
          onClick={close}
        >
          취소
        </Button>
        <Button size='medium' onClick={() => {}}>
          게시하기
        </Button>
      </div>
    </>
  );
};

export default Publish;
