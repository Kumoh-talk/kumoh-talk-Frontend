import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageComponent from './ImageComponent';
import Image from '@tiptap/extension-image';
import { CUSTOM_NODE } from '@/app/lib/constants/post/board';
import { Plugin, PluginKey } from '@tiptap/pm/state';

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
  name: CUSTOM_NODE.IMAGE,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: '100%' },
      height: { default: 'auto' },
      margin: { default: '0 auto' },
      caption: { default: '' },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteImage'),
        props: {
          handlePaste: (view, event, slice) => {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            const items = Array.from(clipboardData.items);
            const imageItem = items.find(
              (item) => item.type.indexOf('image') === 0
            );
            if (!imageItem) return false;

            const file = imageItem.getAsFile();
            if (!file) return false;

            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result;
              if (typeof result === 'string') {
                this.editor.commands.setImage({ src: result });
              } else {
                console.error('Unexpected result type:', result);
              }
            };
            reader.readAsDataURL(file);

            return true;
          },
        },
      }),
      new Plugin({
        key: new PluginKey('dropImage'),
        props: {
          handleDrop: (view, event, slice) => {
            const dataTransfer = event.dataTransfer;
            if (!dataTransfer) return false;

            const files = dataTransfer.files;
            if (!files || files.length === 0) return false;

            const imageFile = Array.from(files).find(
              (file) => file.type.indexOf('image') === 0
            );
            if (!imageFile) return false;

            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result;
              if (typeof result === 'string') {
                this.editor.commands.setImage({ src: result });
              } else {
                console.error('Unexpected result type:', result);
              }
            };
            reader.readAsDataURL(imageFile);

            return true;
          },
        },
      }),
    ];
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
