import { RecruitmentBoardTitle } from '@/app/components/recruitment-boards/detail/RecruitmentBoardTitle';
import RecruitmentBoardContent from '@/app/components/recruitment-boards/detail/RecruitmentBoardContent';
import dayjs from 'dayjs';
import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import ApplyButton from '@/app/components/recruitment-boards/detail/ApplyButton';
import ModifyButton from '@/app/components/recruitment-boards/detail/ModifyButton';
import CheckApplicantButton from '@/app/components/recruitment-boards/detail/CheckApplicantButton';
import styles from '@/app/recruitment-boards/detail/page.module.scss';

export default function RecruitmentBoardDetail({
  boardDetail,
  userId,
  writerUserId,
  boardId,
}: {
  boardDetail: RecruitmentBoardsApi;
  userId: number;
  writerUserId: number;
  boardId: string;
}) {
  const { success, data } = boardDetail;

  if (!data.title) {
    return <p>Loading...</p>;
  }

  const buttonBlock = (
    <div className={styles.buttonBlock}>
      {userId === writerUserId ? (
        <>
          {/* <ModifyButton /> */}
          <CheckApplicantButton
            id={boardId}
            title={boardDetail.data.title}
            boardType={boardDetail.data.type}
            tag={boardDetail.data.tag}
            name={boardDetail.data.host}
          />
        </>
      ) : (
        <ApplyButton
          title={boardDetail.data.title}
          detail={boardDetail.data.summary}
          tag={boardDetail.data.tag}
        />
      )}
    </div>
  );

  return (
    <main>
      <RecruitmentBoardTitle
        title={data.title}
        type={data.type}
        tag={data.tag}
        name={data.host}
      />
      <RecruitmentBoardContent
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
        buttonBlock={buttonBlock}
      />
    </main>
  );
}
