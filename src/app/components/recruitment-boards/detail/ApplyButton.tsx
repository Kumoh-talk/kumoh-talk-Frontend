'use client';

import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export interface Props {
  title: string;
  detail: string;
  tag: string;
}
// TODO: 백엔드 api 완성되면 수정
export default function ApplyButton({ title, detail, tag }: Props) {
  const params = useSearchParams();
  const boardId = params.get('id');
  const boardType = params.get('boardType');

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./apply?id=${boardId}&title=${title}&boardType=${boardType}&detail=${detail}&tag=${tag}`}
      passHref={true}
    >
      <Button size={'medium'}>신청하기</Button>
    </Link>
  );
}
