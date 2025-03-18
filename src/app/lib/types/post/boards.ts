export interface DraftPreview {
  boardId: number;
  title: string;
  updatedAt: number[];
}

export interface DraftContent {
  boardId: number;
  title: string;
  contents: string;
  categoryNames: string[];
  boardHeadImageUrl: string;
}

interface BaseBoard {
  title: string;
  contents: string;
  categoryName: string[];
  boardHeadImageUrl?: string;
}

export interface PostBoards extends BaseBoard {
  boardType: 'SEMINAR' | 'NOTICE';
}

export interface PatchBoards extends BaseBoard {
  id: number;
}
