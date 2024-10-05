'use client'

import styles from './boardButton.module.scss';
import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// TODO: 백엔드 api 완성되면 수정
export default function ApplyButton() {
  const params = useParams();

  const onApply = () => {
  };

  return (
    <Link style={{ textDecoration: 'none' }} href={`./apply?id=${params.id}`} passHref={true}>
      <Button onClick={ApplyButton} size={'medium'}>신청하기</Button>
    </Link>
  )
}