import { useState, useEffect, useRef } from 'react';
import { debounce } from 'es-toolkit';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { createDraft, editDraft } from '@/app/lib/apis/post/saveDraft';
import { getHHmmssFormat } from '@/app/lib/utils/post/dateFormatter';

const useAutoSave = () => {
  const { boardId, setBoardId, title, tagList, boardHeadImageUrl } =
    usePostContent();
  const { editor } = useCurrentEditor();
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

    if (boardId) {
      await editDraft({
        id: boardId,
        title,
        contents: editor.getHTML(),
        categoryName: tagList,
        boardHeadImageUrl,
        editor,
      });
    } else {
      const newBoardId = await createDraft({
        title,
        contents: editor.getHTML(),
        categoryName: tagList,
        boardType: 'SEMINAR',
        boardHeadImageUrl,
        editor,
      });

      if (newBoardId) {
        setBoardId(newBoardId);
      }
    }
    setLastSavedAt(getHHmmssFormat(new Date()));
  };

  const debouncedSaveDraft = debounce(saveDraft, 5000, { edges: ['trailing'] });

  useEffect(() => {
    debouncedSaveDraft();

    return () => {
      debouncedSaveDraft.cancel();
    };
  }, [title, contents, tagList, boardHeadImageUrl, debouncedSaveDraft]);

  return {
    saveDraft: debouncedSaveDraft,
    lastSavedAt,
    cancelAutoSave: debouncedSaveDraft.cancel,
    flushAutoSave: debouncedSaveDraft.flush,
  };
};

export default useAutoSave;
