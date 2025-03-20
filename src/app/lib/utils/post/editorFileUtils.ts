import type { Editor } from '@tiptap/react';

const CUSTOM_NODE = 'customImage';

const includesCustomNode = (editor: Editor) => {
  let includes = false;

  editor.state.doc.descendants((node) => {
    if (node.type.name === CUSTOM_NODE) {
      includes = true;
    }
  });

  return includes;
};

export { includesCustomNode };
