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

  renderHTML({ node }) {
    const { ogImage, ogTitle, ogDescription, ogUrl, requestedUrl } = node.attrs;

    return [
      'figure',
      {
        class: 'editorLinkPreviewContainer',
      },
      [
        'a',
        {
          class: 'editorLinkPreviewContent',
          href: requestedUrl,
          target: '_blank',
          'source-url': requestedUrl,
        },
        [
          'div',
          { class: 'editorLinkPreviewImage' },
          ['img', { src: ogImage, alt: `${ogTitle}-image` }],
        ],
        [
          'div',
          { class: 'editorLinkPreviewInfo' },
          ['span', { class: 'editorLinkPreviewTitle' }, ogTitle],
          ['span', { class: 'editorLinkPreviewDescription' }, ogDescription],
          ['span', { class: 'editorLinkPreviewUrl' }, ogUrl],
        ],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkPreviewComponent, { as: 'figure' });
  },
});

export default LinkPreviewNode;
