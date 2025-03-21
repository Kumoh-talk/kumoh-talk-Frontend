import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import BoardDetail from '@/app/components/recruitment-boards/apply/BoardDetail';
import { typeToText } from '@/app/lib/constants/tag/tagValues';

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
        type={boardType.toUpperCase() as keyof typeof typeToText}
        tag={tag as keyof typeof typeToText}
      />
      <BoardDetail content={detail} />
    </>
  );
}
