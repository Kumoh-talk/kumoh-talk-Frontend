const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
};

export const postPresignedUrl = (
  boardId: number,
  fileName: string,
  fileType: 'IMAGE' | 'ATTACH'
) => {
  return _fetch(
    `${baseUrl}/boards/files/presigned-url`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      boardId,
      fileName,
      fileType,
    }
  );
};
