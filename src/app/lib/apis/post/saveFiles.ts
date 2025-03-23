import {
  postPresignedUrl,
  putImage,
  postImage,
  putAttach,
  patchAttach,
} from '@/app/lib/apis/post/files';
import {
  findImageNodes,
  findAttachNodes,
  extractFilesFromImageNodes,
  extractFilesFromAttachNodes,
  replaceUrls,
  replaceAttachUrls
} from '@/app/lib/utils/post/editorFileUtils';
import type { Editor } from '@tiptap/react';

const getPresignedUrl = async (boardId: number, imageNodes: Array<any>) => {
  const presignedUrls: string[] = [];

  for (const { node } of imageNodes) {
    const fileName = node.attrs.title;

    try {
      const response = await postPresignedUrl(boardId, fileName, 'IMAGE');

      if (response.success === 'true') {
        const presignedURL = response.data;

        presignedUrls.push(presignedURL);
      } else {
        console.error('Presigned URL 발급 실패');
      }
    } catch (error) {
      console.error('Presigned URL 발급 실패');
    }
  }

  return presignedUrls;
};

const uploadImage = async (image: File, presignedUrl: string) => {
  try {
    await putImage(image, presignedUrl);
  } catch (error) {
    console.error(error);
  }
};

const uploadImages = async (images: File[], presignedUrls: string[]) => {
  const uploadPromises = presignedUrls.map((url, idx) =>
    uploadImage(images[idx], url)
  );

  await Promise.all(uploadPromises);
};

const submitImageUrl = async (boardId: number, presignedUrl: string) => {
  try {
    const response = await postImage(boardId, presignedUrl);

    if (response.success !== 'true') {
      console.error(`이미지 업로드 실패`);
    }
  } catch (error) {
    console.error(error);
  }
};

const submitImageUrls = async (boardId: number, presignedUrls: string[]) => {
  const submitPromises = presignedUrls.map((url) =>
    submitImageUrl(boardId, url)
  );

  await Promise.all(submitPromises);
};

const saveImage = async (boardId: number, file: File) => {
  try {
    const presignedResponse = await postPresignedUrl(boardId, file.name, 'IMAGE');

    if (presignedResponse.success !== 'true') {
      throw new Error('Presigned URL 요청 실패');
    }
    const presignedUrl = presignedResponse.data;

    await putImage(file, presignedUrl);

    const submitResponse = await postImage(boardId, presignedUrl);

    if (submitResponse.success !== 'true') {
      throw new Error('이미지 등록(Submit) 실패');
    }

    return presignedUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveImages = async (editor: Editor, boardId: number) => {
  const customImageNodes = findImageNodes(editor);
  const files = extractFilesFromImageNodes(customImageNodes);

  const presignedUrls = await getPresignedUrl(boardId, customImageNodes);

  await uploadImages(files, presignedUrls);
  await submitImageUrls(boardId, presignedUrls);

  return { customImageNodes, presignedUrls };
};

const getReplacedContents = async (editor: Editor, boardId: number) => {
  const serializedHTML = editor.getHTML();
  const { customImageNodes, presignedUrls } = await saveImages(editor, boardId);

  const replacedHTML = replaceUrls(
    serializedHTML,
    customImageNodes,
    presignedUrls
  );

  return replacedHTML;
}

const getAttachPresignedURL = async (boardId: number, attachNodes: Array<any>) => {
  const presignedUrls: string[] = [];

  for (const { node } of attachNodes) {
    const fileName = node.attrs.fileName;

    try {
      const response = await postPresignedUrl(boardId, fileName, 'ATTACH');

      if (response.success === 'true') {
        const presignedURL = response.data;

        presignedUrls.push(presignedURL);
      } else {
        console.error('Presigned URL 발급 실패');
      }
    } catch (error) {
      console.error('Presigned URL 발급 실패');
    }
  }

  return presignedUrls;
};

const uploadAttach = async (attach: File, presignedUrl: string) => {
  try {
    await putAttach(attach, presignedUrl);
  } catch (error) {
    console.error(error);
  }
};

const uploadAttaches = async (attaches: File[], presignedUrls: string[]) => {
  const uploadPromises = presignedUrls.map((url, idx) =>
    uploadAttach(attaches[idx], url)
  );

  await Promise.all(uploadPromises);
};

const submitAttachUrl = async (boardId: number, presignedUrl: string) => {
  try {
    const response = await patchAttach(boardId, presignedUrl);

    if (response.success !== 'true') {
      console.error(`이미지 업로드 실패`);
    }
  } catch (error) {
    console.error(error);
  }
};

const submitAttachUrls = async (boardId: number, presignedUrls: string[]) => {
  const submitPromises = presignedUrls.map((url) =>
    submitAttachUrl(boardId, url)
  );

  await Promise.all(submitPromises);
};

const saveAttaches = async (editor: Editor, boardId: number) => {
  const serializedHTML = editor.getHTML();
  const attachNodes = findAttachNodes(editor);
  
  const attaches = await extractFilesFromAttachNodes(attachNodes);
  const presignedUrls = await getAttachPresignedURL(boardId, attachNodes);

  await uploadAttaches(attaches, presignedUrls);
  await submitAttachUrls(boardId, presignedUrls);

  const replacedHTML = replaceAttachUrls(
    serializedHTML,
    attachNodes,
    presignedUrls
  );

  return replacedHTML;
};

export { saveImage, saveImages, saveAttaches, getReplacedContents };
