import type { Editor } from '@tiptap/react';

const CUSTOM_NODE = {
  IMAGE: 'customImage',
};

const includesCustomNode = (editor: Editor) => {
  let includes = false;

  editor.state.doc.descendants((node) => {
    if (node.type.name === CUSTOM_NODE.IMAGE) {
      includes = true;
    }
  });

  return includes;
};

const findImageNodes = (editor: Editor) => {
  const imageNodes: Array<any> = [];

  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === CUSTOM_NODE.IMAGE &&
      node.attrs.src.startsWith('data:image')
    ) {
      imageNodes.push({ node, pos });
    }
  });

  return imageNodes;
};

export { includesCustomNode, findImageNodes };
