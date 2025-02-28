'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

import Header from '../components/post/Header/Header';
import EditorMenu from '../components/post/EditorMenu/EditorMenu';

import styles from './page.module.scss';

export default function Post() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  });

  if (!editor) return null;

  return (
    <>
      <Header />
      <EditorMenu editor={editor} />
      <main className={styles.layout}>
        <div className={styles.content}>
          <input className={styles.title} placeholder='제목을 입력하세요' />
          <div className={styles.editorContainer}>
            <EditorContent editor={editor} />
          </div>
          <div>해시태그</div>
        </div>
      </main>
    </>
  );
}
