import { createContext, useContext, useState, ReactNode } from 'react';

interface PostModeContextValue {
  isMarkdownMode: boolean;
  setIsMarkdownMode: (value: boolean) => void;
}

const PostModeContext = createContext<PostModeContextValue | undefined>(undefined);

export const PostModeProvider = ({ children }: { children: ReactNode }) => {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);

  return (
    <PostModeContext.Provider value={{ isMarkdownMode, setIsMarkdownMode }}>
      {children}
    </PostModeContext.Provider>
  );
};

export const usePostMode = () => {
  const context = useContext(PostModeContext);

  if (!context) {
    throw new Error('useMode must be used within a PostModeProvider');
  }

  return context;
};
