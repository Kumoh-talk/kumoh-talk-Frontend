import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageComponent from './ImageComponent';
import Image from '@tiptap/extension-image';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string | number;
        height?: string | number;
        isDraggable?: boolean;
      }) => ReturnType;
    };
  }
}

const CustomImage = Image.extend({
  name: 'customImage',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: '100%' },
      height: { default: 'auto' },
      margin: { default: '0 auto' },
      caption: { default: '' },
    };
  },

  renderHTML({ node }) {
    const { src, alt, title, width, height, margin, caption } = node.attrs;

    return [
      'div',
      {
        class: 'editorCustomImage',
      },
      [
        'div',
        {
          class: 'editorCustomImageContainer',
          style: `width: ${width}px; height: ${height}px; margin: ${margin};`,
        },
        [
          'div',
          {
            class: 'editorCustomImageWrapper',
          },
          [
            'img',
            {
              class: 'editorImage',
              src,
              alt,
              title,
            },
          ],
        ],
        ['span', { class: 'editorCustomImageCaption' }, caption],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

export default CustomImage;
