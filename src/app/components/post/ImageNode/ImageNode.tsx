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

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

export default CustomImage;
