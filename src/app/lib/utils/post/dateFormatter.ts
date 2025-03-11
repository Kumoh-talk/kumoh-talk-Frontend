import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Dayjs } from 'dayjs';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const parseToKST = (timestamp: number[]): Dayjs => {
  const [year, month, date, hour, minute, second] = timestamp;

  const UTCTimestamp = Date.UTC(year, month - 1, date, hour, minute, second);
  const KSTTimestamp = dayjs.utc(UTCTimestamp).tz('Asia/Seoul');

  return KSTTimestamp;
};

const formatTime = (date: Dayjs): string => {
  const now = dayjs();

  const diffMinutes = now.diff(date, 'minute');
  const diffHours = now.diff(date, 'hour');
  const diffDays = now.diff(date, 'day');

  if (diffMinutes < 1) return '방금';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return date.format('YYYY.MM.DD');
};

const getRelativeTime = (updatedAt: number[]): string => {
  const date = parseToKST(updatedAt);

  return formatTime(date);
};

export { getRelativeTime };
