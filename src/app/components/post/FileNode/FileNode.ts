import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import FileComponent from './FileComponent';

const FileNode = Node.create({
  name: 'fileNode',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      fileName: { default: null },
      fileType: { default: null },
      fileSize: { default: null },
      fileUrl: { default: null },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileComponent);
  },
});

export default FileNode;
