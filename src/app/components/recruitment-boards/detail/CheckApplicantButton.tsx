'use client';

import Link from 'next/link';
import Button from '@/app/components/common/button/Button';

export default function CheckApplicantButton({
  id,
  title,
  boardType,
  tag,
  name,
}: {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  name: string;
}) {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list?id=${id}&title=${title}&boardType=${boardType}&tag=${tag}&name=${name}&page=1&sort=createdAt%2CDESC`}
      passHref={true}
    >
      <Button onClick={() => {}} size={'large'}>
        신청자 확인하기
      </Button>
    </Link>
  );
}
