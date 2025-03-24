'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import PostProvider from '../lib/contexts/post/PostProvider';
import PostEditorProvider from '../lib/contexts/post/PostEditorProvider';
import { usePreventUnload } from '../lib/hooks/common/usePreventUnload';
import Header from '../components/post/Header/Header';
import EditorMenu from '../components/post/EditorMenu/EditorMenu';
import Title from '../components/post/Title/Title';
import HashTag from '../components/post/HashTag/HashTag';
import BoardInitializer from '../components/post/BoardInit/BoardInit';
import styles from './page.module.scss';

export default function Post() {
  usePreventUnload();

  const searchParams = useSearchParams();
  const boardIdParam = searchParams.get('boardId');
  const boardId = boardIdParam ? parseInt(boardIdParam, 10) : null;

  const SlotBefore = () => (
    <>
      {boardId && <BoardInitializer boardId={boardId} />}
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
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </PostProvider>
  );
}
