'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Header from '../components/post/Header/Header';
import EditorMenu from '../components/post/EditorMenu/EditorMenu';
import styles from './page.module.scss';

export default function Post() {
  const [isMarkdwonMode, setIsMarkdwonMode] = useState(false);

  const lowlight = createLowlight(all);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
      enablePasteRules: isMarkdwonMode,
      enableInputRules: isMarkdwonMode,
      immediatelyRender: false,
    },
    [isMarkdwonMode]
  );

  const handleModeChange = (value: string) => {
    setIsMarkdwonMode(value === 'markdown');
    alert(
      '작성 모드를 변경하시겠습니까?\n현재 서식이 유지되지 않을 수 있습니다.'
    );
  };

  if (!editor) return null;

  return (
    <>
      <Header />
      <EditorMenu
        editor={editor}
        isMarkdwonMode={isMarkdwonMode}
        onModeChange={handleModeChange}
      />
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
