import { CUSTOM_NODE } from '@/app/lib/constants/post/board';
import type { Editor } from '@tiptap/react';

type CustomNode = keyof typeof CUSTOM_NODE;

const includesCustomNode = (editor: Editor, customNode: CustomNode) => {
  let includes = false;

  editor.state.doc.descendants((node) => {
    if (node.type.name === CUSTOM_NODE[customNode]) {
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

const findAttachNodes = (editor: Editor) => {
  const attachNodes: Array<any> = [];

  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === CUSTOM_NODE.ATTACH &&
      node.attrs.fileUrl.startsWith('blob:')
    ) {
      attachNodes.push({ node, pos });
    }
  });

  return attachNodes;
};

const findBoardHeadImageUrl = (contents : string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(contents, 'text/html');
  const headImage = doc.querySelector('img.editorImage[data-is-head-image="true"]');

  return headImage ? headImage.getAttribute('src') : null;
}

const convertBase64ToFile = (base64: string, fileName: string): File => {
  const [header, data] = base64.split(',');
  const mimeMatch = header.match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('유효하지 않은 Base64 데이터입니다.');
  }

  const mime = mimeMatch[1];
  const bstr = atob(data);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], fileName, { type: mime });
};

const extractFilesFromImageNodes = (imageNodes: Array<any>): File[] => {
  return imageNodes.map(({ node }) => {
    const src = node.attrs.src;
    const fileName = node.attrs.title;

    return convertBase64ToFile(src, fileName);
  });
};

const convertBlobToFile = async (blobUrl: string, filename: string) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const file = new File([blob], filename, { type: blob.type });

  return file;
};

const extractFilesFromAttachNodes = async (attachNodes: Array<any>) => {
  const convertPromises = attachNodes.map(async ({ node }) => {
    const fileUrl = node.attrs.fileUrl;
    const fileName = node.attrs.fileName;

    return await convertBlobToFile(fileUrl, fileName);
  });

  return await Promise.all(convertPromises);
};

const replaceUrls = (
  serializedHTML: string,
  imageNodes: Array<any>,
  presignedUrls: string[]
) => {
  let replacedHTML = serializedHTML;

  imageNodes.forEach((node, index) => {
    const oldSrc = node.node.attrs.src;
    const newSrc = presignedUrls[index].split('?')[0];

    replacedHTML = replacedHTML.replace(oldSrc, newSrc);
  });

  return replacedHTML;
};

const replaceAttachUrls = (
  serializedHTML: string,
  attachNodes: Array<any>,
  presignedUrls: string[]
) => {
  let replacedHTML = serializedHTML;

  attachNodes.forEach((node, index) => {
    const oldUrl = node.node.attrs.fileUrl;
    const newUrl = presignedUrls[index].split('?')[0];

    replacedHTML = replacedHTML.replace(oldUrl, newUrl);
  });

  return replacedHTML;
};

export {
  includesCustomNode,
  findImageNodes,
  findAttachNodes,
  findBoardHeadImageUrl,
  extractFilesFromImageNodes,
  extractFilesFromAttachNodes,
  replaceUrls,
  replaceAttachUrls
};
