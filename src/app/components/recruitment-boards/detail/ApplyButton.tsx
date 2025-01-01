'use client';

import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// TODO: 백엔드 api 완성되면 수정
export default function ApplyButton() {
  const params = useSearchParams();
  const boardId = params.get('id');
  const boardType = params.get('boardType');

  const onApply = () => {};

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./apply?id=${boardId}&boardType=${boardType}`}
      passHref={true}
    >
      <Button onClick={ApplyButton} size={'medium'}>
        신청하기
      </Button>
    </Link>
  );
}
