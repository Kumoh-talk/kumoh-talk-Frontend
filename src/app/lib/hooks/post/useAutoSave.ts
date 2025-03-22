import { useState, useEffect, useRef } from 'react';
import { debounce } from 'es-toolkit';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { createDraft, editDraft } from '@/app/lib/apis/post/saveDraft';
import { useInitBoardId } from '@/app/lib/hooks/post/useInitBoardId';
import { includesCustomNode } from '@/app/lib/utils/post/editorFileUtils';
import { saveImages, saveAttaches } from '@/app/lib/apis/post/saveFiles';
import { getHHmmssFormat } from '@/app/lib/utils/post/dateFormatter';
import { AUTO_SAVE_DELAY } from '@/app/lib/constants/post/board';

const useAutoSave = () => {
  const { boardId, setBoardId, title, tagList, boardHeadImageUrl, boardType } =
    usePostContent();
  const { editor } = useCurrentEditor();
  const { initBoardId } = useInitBoardId();
  const contents = editor?.getHTML() || '<p></p>';

  const prevTitle = useRef<string>('');
  const prevContents = useRef<string>('');
  const prevTagList = useRef<string[]>([]);
  const prevBoardImage = useRef<string>('');

  const [lastSavedAt, setLastSavedAt] = useState('');

  const saveDraft = async () => {
    if (!title.trim() || !contents.trim() || !editor) return;

    if (
      title === prevTitle.current &&
      contents === prevContents.current &&
      JSON.stringify(tagList) === JSON.stringify(prevTagList.current) &&
      boardHeadImageUrl === prevBoardImage.current
    ) {
      return;
    }

    const imageNode = includesCustomNode(editor, 'IMAGE');
    const attachNode = includesCustomNode(editor, 'ATTACH');

    let replacedContents = editor.getHTML();

    if (boardId) {
      if (imageNode) {
        replacedContents = await saveImages(editor, boardId);
        editor.commands.setContent(replacedContents);
      }

      if (attachNode) {
        replacedContents = await saveAttaches(editor, boardId);
        editor.commands.setContent(replacedContents);
      }

      await editDraft({
        id: boardId,
        title,
        contents: replacedContents,
        categoryName: tagList,
        boardHeadImageUrl,
      });

      setLastSavedAt(getHHmmssFormat(new Date()));

      return;
    }

    if (imageNode || attachNode) {
      const newBoardId = await initBoardId();

      if (!newBoardId) return;

      setBoardId(newBoardId);

      if (imageNode) {
        replacedContents = await saveImages(editor, newBoardId);
        editor.commands.setContent(replacedContents);
      }

      if (attachNode) {
        replacedContents = await saveAttaches(editor, newBoardId);
        editor.commands.setContent(replacedContents);
      }

      await editDraft({
        id: newBoardId,
        title,
        contents: replacedContents,
        categoryName: tagList,
        boardHeadImageUrl,
      });

      setLastSavedAt(getHHmmssFormat(new Date()));

      return;
    }

    const newBoardId = await createDraft({
      title,
      contents: editor.getHTML(),
      categoryName: tagList,
      boardHeadImageUrl,
      boardType,
    });

    if (newBoardId) setBoardId(newBoardId);

    setLastSavedAt(getHHmmssFormat(new Date()));
  };

  const debouncedSaveDraft = debounce(saveDraft, AUTO_SAVE_DELAY, { edges: ['trailing'] });

  useEffect(() => {
    debouncedSaveDraft();

    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [title, contents, tagList, boardHeadImageUrl]);

  return {
    saveDraft: debouncedSaveDraft,
    lastSavedAt,
    cancelAutoSave: debouncedSaveDraft.cancel,
    flushAutoSave: debouncedSaveDraft.flush,
  };
};

export default useAutoSave;
