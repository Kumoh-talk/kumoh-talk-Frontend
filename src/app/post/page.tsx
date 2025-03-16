'use client';

import PostProvider from '../lib/contexts/post/PostProvider';
import PostEditorProvider from '../lib/contexts/post/PostEditorProvider';
import { usePreventUnload } from '../lib/hooks/common/usePreventUnload';
import Header from '../components/post/Header/Header';
import EditorMenu from '../components/post/EditorMenu/EditorMenu';
import Title from '../components/post/Title/Title';
import HashTag from '../components/post/HashTag/HashTag';
import styles from './page.module.scss';

export default function Post() {
  usePreventUnload();

  const SlotBefore = () => (
    <>
      <Header />
      <EditorMenu />
      <div className={styles.content}>
        <Title />
      </div>
    </>
  );

  const SlotAfter = () => (
    <div className={styles.content}>
      <HashTag />
    </div>
  );

  return (
    <PostProvider>
      <div className={styles.layout}>
        <PostEditorProvider
          editorContainerProps={{ className: styles.editorContainer }}
          slotBefore={<SlotBefore />}
          slotAfter={<SlotAfter />}
        />
      </div>
    </PostProvider>
  );
}
