'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/common/button/Button';

export default function CheckApplicantButton() {
  const boardId = useSearchParams().get('id');

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list?id=${boardId}`}
      passHref={true}
    >
      <Button onClick={() => {}} size={'medium'}>
        신청자 확인하기
      </Button>
    </Link>
  );
}
