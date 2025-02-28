import { useState, KeyboardEvent } from 'react';
import XSvg from '@/app/assets/svg/Editor/XSvg';
import styles from './HashTag.module.scss';

const HashTag = () => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const MAX_TAG = 10;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.trim() === '') return;

    if (e.key === 'Enter') {
      e.preventDefault();

      if (!tagList.includes(inputValue)) {
        setTagList([...tagList, inputValue.trim()]);
      }

      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={styles.editor_tag}>
      {tagList.map((tag) => (
        <span className={styles.text_tag} key={tag}>
          <span>#</span>
          <span>{tag}</span>
          <button type='button' onClick={() => removeTag(tag)}>
            <XSvg />
          </button>
        </span>
      ))}
      {tagList.length < MAX_TAG && (
        <span className={styles.input_tag}>
          <span>#</span>
          <input
            type='text'
            placeholder='태그입력'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </span>
      )}
    </div>
  );
};

export default HashTag;
