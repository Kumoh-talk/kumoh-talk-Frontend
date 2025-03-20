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

  parseHTML() {
    return [
      {
        tag: 'div.editorCustomImage',
        getAttrs: (el) => {
          const container = el.querySelector('.editorCustomImageContainer') as HTMLElement | null;
          const wrapper = container?.querySelector('.editorCustomImageWrapper') as HTMLElement | null;
          const img = wrapper?.querySelector('.editorImage') as HTMLImageElement | null;
          const caption = el.querySelector('.editorCustomImageCaption');

          return {
            src: img?.getAttribute('src') || '',
            alt: img?.getAttribute('alt') || '',
            title: img?.getAttribute('title') || '',
            width: container?.style.width || '100%',
            height: container?.style.height || 'auto',
            margin: container?.style.margin || '0 auto',
            caption: caption?.textContent || '',
          };
        },
      },
    ];
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
          style: `width: ${width}; height: ${height}; margin: ${margin};`,
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
