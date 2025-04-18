import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import FileComponent from './FileComponent';
import { CUSTOM_NODE } from '@/app/lib/constants/post/board';

const FileNode = Node.create({
  name: CUSTOM_NODE.ATTACH,
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

  parseHTML() {
    return [
      {
        tag: 'figure.editorFileContainer',
        getAttrs: (el) => {
          const link = el.querySelector('.editorFileContent');
          const fileNameElement = el.querySelector('.editorFileName');
          const fileTypeElement = el.querySelector('.editorFileType');
          const fileSizeElement = el.querySelector('.editorFileSize');

          return {
            fileUrl: link?.getAttribute('href') || '',
            fileName: fileNameElement?.textContent || '',
            fileType: fileTypeElement?.textContent?.replace('.', '') || '',
            fileSize: fileSizeElement?.textContent || '',
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const { fileName, fileType, fileSize, fileUrl } = node.attrs;

    return [
      'figure',
      { class: 'editorFileContainer' },
      [
        'a',
        { class: 'editorFileContent', href: fileUrl, download: fileName },
        [
          'div',
          { class: 'editorFileIcon' },
          [
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '20',
              height: '20',
              viewBox: '0 0 24 24',
              fill: 'none',
              class: 'editorFileIconSvg',
            },
            [
              'path',
              {
                d: 'M20.3337 17.8333C20.3337 18.2754 20.1581 18.6993 19.8455 19.0118C19.5329 19.3244 19.109 19.5 18.667 19.5H5.33366C4.89163 19.5 4.46771 19.3244 4.15515 19.0118C3.84259 18.6993 3.66699 18.2754 3.66699 17.8333V6.16667C3.66699 5.72464 3.84259 5.30072 4.15515 4.98816C4.46771 4.67559 4.89163 4.5 5.33366 4.5H9.50033L11.167 7H18.667C19.109 7 19.5329 7.17559 19.8455 7.48816C20.1581 7.80072 20.3337 8.22464 20.3337 8.66667V17.8333Z',
                stroke: 'currentColor',
                strokeWidth: '1.25',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              },
            ],
          ],
        ],
        [
          'div',
          { class: 'editorFileDescription' },
          [
            'div',
            { class: 'editorFileNameWrapper' },
            ['span', { class: 'editorFileName' }, fileName],
            ['span', { class: 'editorFileType' }, `.${fileType}`],
          ],
          ['span', { class: 'editorFileSize' }, fileSize],
        ],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileComponent);
  },
});

export default FileNode;
