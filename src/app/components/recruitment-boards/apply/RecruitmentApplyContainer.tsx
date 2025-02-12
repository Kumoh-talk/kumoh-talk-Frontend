import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import BoardDetail from '@/app/components/recruitment-boards/apply/BoardDetail';

export interface Props {
  title: string;
  boardType: string;
  tag: string;
  detail: string;
}

export default function RecruitmentApplyContainer({
  title,
  boardType,
  tag,
  detail,
}: Props) {
  return (
    <>
      <RecruitmentBoardTitle
        title={title}
        type={boardType.toUpperCase()}
        tag={tag}
      />
      <BoardDetail content={detail} />
    </>
  );
}
