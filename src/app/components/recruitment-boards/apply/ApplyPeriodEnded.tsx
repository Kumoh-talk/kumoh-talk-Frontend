import { Calendar, CaptionsOff, Clock } from 'lucide-react';
import Button from '../../common/button/Button';
import styles from './applyPeriodEnded.module.scss';
import { useEffect, useState } from 'react';
import { getRecruitmentBoardDetail } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function ApplyPeriodEnded({
  recruitmentBoardId,
}: {
  recruitmentBoardId: string;
}) {
  const router = useRouter();
  const [date, setDate] = useState<{
    recruitmentStart: string;
    recruitmentDeadline: string;
  }>({
    recruitmentStart: '',
    recruitmentDeadline: '',
  });

  useEffect(() => {
    async function fetchDate() {
      const response = await getRecruitmentBoardDetail(recruitmentBoardId);
      setDate({
        recruitmentStart: response.data.recruitmentStart,
        recruitmentDeadline: response.data.recruitmentDeadline,
      });
    }
    fetchDate();
  }, [recruitmentBoardId]);

  return (
    <div className={styles.container}>
      <CaptionsOff className={styles.offIcon} />
      <h1>현재 신청 기간이 아닙니다</h1>
      <p>
        이 모집글의 신청 기간이 종료되었거나 아직 시작되지 않았습니다. 신청
        기간을 확인해 주세요.
      </p>
      <div className={styles.dateContainer}>
        <p>
          <Calendar /> 신청 기간:{' '}
          {dayjs(date.recruitmentDeadline).format('YYYY-MM-DD')} ~{' '}
          {dayjs(date.recruitmentStart).format('YYYY-MM-DD')}
        </p>
        <p>
          <Clock /> 오늘 날짜: {dayjs(new Date()).format('YYYY-MM-DD')}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button size='medium' onClick={() => router.back()}>
          목록으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
