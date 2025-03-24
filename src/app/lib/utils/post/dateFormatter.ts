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

const parseToKST = (timestamp: string): Dayjs => {
  const UTCTimestamp = dayjs.utc(timestamp);
  const KSTTimestamp = UTCTimestamp.tz('Asia/Seoul');

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

const getHHmmssFormat = (updatedAt: string | Date): string => {
  const isoString = updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt;
  const date = parseToKST(isoString);

  return date.format('HH:mm:ss');
};

const getRelativeTime = (updatedAt: string): string => {
  const date = parseToKST(updatedAt);

  return formatTime(date);
};

const getFullDate = (updatedAt: number[]): string => {
  if (!Array.isArray(updatedAt) || updatedAt.length < 6) return '날짜 오류';

  const [year, month, day, hour, minute] = updatedAt;
  const date = dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .hour(hour)
    .minute(minute);

  return date.format('YYYY.MM.DD A h:mm');
};

export { getRelativeTime, getHHmmssFormat, getFullDate };
