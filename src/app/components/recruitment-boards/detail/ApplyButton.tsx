'use client';

import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export interface Props {
  title: string;
  detail: string;
  tag: string;
  userRole:
    | 'ROLE_GUEST'
    | 'ROLE_USER'
    | 'ROLE_ACTIVE_USER'
    | 'ROLE_ADMIN'
    | null;
}

export default function ApplyButton({ title, detail, tag, userRole }: Props) {
  const params = useSearchParams();
  if (userRole === 'ROLE_GUEST') {
    return '로그인 후 신청 가능합니다.';
  }
  const boardId = params.get('id');
  const boardType = params.get('boardType');

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./apply?id=${boardId}&title=${title}&boardType=${boardType}&detail=${detail}&tag=${tag}`}
      passHref={true}
    >
      <Button size={'large'}>신청하기</Button>
    </Link>
  );
}
