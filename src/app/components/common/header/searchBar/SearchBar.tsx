'use client';

import { useState } from 'react';
import SearchSvg from '@/app/assets/svg/SearchSvg';
import styles from './searchBar.module.scss';

export default function SearchBar() {
  const [isOpened, setOpened] = useState(false);
  const [keyword, setKeyword] = useState('');

  const submit = () => {
    console.log(`검색어: ${keyword}`);
  };

  return isOpened ? (
    <div className={styles.searchBar}>
      <button className={styles.searchButton} onClick={submit}>
        <SearchSvg />
      </button>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
    </div>
  ) : (
    <button className={styles.searchButton} onClick={() => setOpened(true)}>
      <SearchSvg />
    </button>
  );
}
