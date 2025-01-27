import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import RecruitmentBoardContent from '@/app/components/recruitment-boards/detail/RecruitmentBoardContent';
import dayjs from 'dayjs';
import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';

export default function RecruitmentBoardDetail({
  boardDetail,
}: {
  boardDetail: RecruitmentBoardsApi;
}) {
  const { success, data } = boardDetail;

  if (!data.title) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <RecruitmentBoardTitle
        title={data.title}
        type={data.type}
        tag={data.tag}
      />
      <RecruitmentBoardContent
        name={data.host}
        categories={[data.type, data.tag]}
        target={data.recruitmentTarget}
        recruitmentNum={data.recruitmentNum}
        recruitmentStart={dayjs(data.recruitmentStart).format(
          'YYYY.MM.DD HH:mm'
        )}
        recruitmentDeadline={dayjs(data.recruitmentDeadline).format(
          'YYYY.MM.DD HH:mm'
        )}
        activity={data.activityCycle}
        activityStart={dayjs(data.activityStart).format('YYYY.MM.DD HH:mm')}
        activityFinish={dayjs(data.activityFinish).format('YYYY.MM.DD HH:mm')}
        detail={data.content}
      />
    </main>
  );
}
