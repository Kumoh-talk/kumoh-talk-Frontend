import {
  postPresignedUrl,
  putImage,
  postImage,
} from '@/app/lib/apis/post/files';
import {
  findImageNodes,
  extractFilesFromImageNodes,
  replaceUrls
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

const saveImages = async (editor: Editor, boardId: number) => {
  const serializedHTML = editor.getHTML();
  const customImageNodes = findImageNodes(editor);
  const files = extractFilesFromImageNodes(customImageNodes);

  const presignedUrls = await getPresignedUrl(boardId, customImageNodes);

  await uploadImages(files, presignedUrls);
  await submitImageUrls(boardId, presignedUrls);

  const replacedHTML = replaceUrls(
    serializedHTML,
    customImageNodes,
    presignedUrls
  );

  return replacedHTML;
};

export { saveImages };
