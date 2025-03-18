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

export const deleteBoard = (boardId: number) => {
  return _fetch(`${baseUrl}/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getMyDrafts = (
  page: number = 1,
  size: number = 10,
  sort: string = 'updatedAt,DESC'
) => {
  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  return _fetch(`${baseUrl}/boards/draft?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
