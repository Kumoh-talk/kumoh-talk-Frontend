import { createContext, useContext, useState } from 'react';

interface PostContentContextValue {
  boardId: number | null;
  setBoardId: (boadId: number) => void;
  title: string;
  setTitle: (title: string) => void;
  tagList: string[];
  setTagList: (tags: string[]) => void;
  boardHeadImageUrl: string;
  setBoardHeadImageUrl: (url: string) => void;
}

const PostContentContext = createContext<PostContentContextValue | undefined>(
  undefined
);

export const PostContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardId, setBoardId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [boardHeadImageUrl, setBoardHeadImageUrl] = useState('');

  return (
    <PostContentContext.Provider
      value={{
        boardId,
        setBoardId,
        title,
        setTitle,
        tagList,
        setTagList,
        boardHeadImageUrl,
        setBoardHeadImageUrl,
      }}
    >
      {children}
    </PostContentContext.Provider>
  );
};

export const usePostContent = () => {
  const context = useContext(PostContentContext);

  if (!context) {
    throw new Error('usePost must be used within a PostContentProvider');
  }

  return context;
};
