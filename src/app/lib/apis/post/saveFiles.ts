import { postPresignedUrl } from '@/app/lib/apis/post/files';

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
