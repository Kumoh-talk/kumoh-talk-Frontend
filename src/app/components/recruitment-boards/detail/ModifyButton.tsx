'use client';

import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// TODO: 백엔드 api 완성되면 수정
export default function ModifyButton() {
  const boardId = useSearchParams().get('id');

  const onModify = () => {};

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./modify?id=${boardId}`}
      passHref={true}
    >
      <Button onClick={onModify} size={'large'}>
        수정하기
      </Button>
    </Link>
  );
}
