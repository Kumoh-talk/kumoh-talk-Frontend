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
