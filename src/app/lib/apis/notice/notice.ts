import type { BoardType, BoardSort } from "@/app/lib/types/notice/board";

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

export const getBoard = (boardId: number) => {
  return _fetch(`${baseUrl}/boards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getBoards = async (
  boardType: BoardType,
  page: string = '1',
  size: string = '15',
  sort: BoardSort
) => {
  const query = new URLSearchParams({
    boardType,
    size,
    page,
    sort: `createdAt,${sort}`,
  });

  try {
    const response = await _fetch(`${baseUrl}/boards/?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.success === 'true') {
      console.log(response.data.pageContents);

      return response.data.pageContents;
    } else {
      console.error('Failed to fetch data:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getMyInformation = () => {
  return _fetch(`${baseUrl}/users/me`, {
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
