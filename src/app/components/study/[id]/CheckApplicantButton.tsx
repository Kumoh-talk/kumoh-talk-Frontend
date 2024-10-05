'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from '@/app/components/common/button/Button';

export default function CheckApplicantButton() {
  const params = useParams();

  return (
    <Link style={{ textDecoration: 'none' }} href={`./list?id=${params.id}`} passHref={true}>
      <Button onClick={() => {}} size={'medium'}>신청자 확인하기</Button>
    </Link>
  )
}