import { ReactNode } from 'react';
import { PostModeProvider } from './PostModeContext';
import { PostContentProvider } from './PostContentContext';

interface PostEditorProps {
  children: ReactNode;
}

const PostProvider = ({ children }: PostEditorProps) => {
  return (
    <PostModeProvider>
      <PostContentProvider>{children}</PostContentProvider>
    </PostModeProvider>
  );
};

export default PostProvider;
