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

export interface PostBoardsProps {
  title: string;
  contents: string;
  categoryName: string[];
  boardType: string;
  boardHeadImageUrl?: string;
}

export const postDraft = ({
  title,
  contents,
  categoryName,
  boardType,
  boardHeadImageUrl,
}: PostBoardsProps) => {
  return _fetch(
    `${baseUrl}/boards`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    {
      title,
      contents,
      categoryName,
      boardType,
      boardHeadImageUrl,
    }
  );
};

export const getBoard = (boardId: number) => {
  return _fetch(`${baseUrl}/boards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getMyDrafts = () => {
  return _fetch(`${baseUrl}/boards/draft`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
