import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import LinkPreviewComponent from './LinkPreviewComponent';

const LinkPreviewNode = Node.create({
  name: 'linkPreviewNode',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      ogImage: { default: '' },
      ogTitle: { default: '' },
      ogDescription: { default: '' },
      ogUrl: { default: '' },
      requestedUrl: { default: '' },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkPreviewComponent, { as: 'figure' });
  },
});

export default LinkPreviewNode;
