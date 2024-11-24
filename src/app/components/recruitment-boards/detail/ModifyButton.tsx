'use client'

import styles from './boardButton.module.scss'
import Button from '@/app/components/common/button/Button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// TODO: 백엔드 api 완성되면 수정
export default function ModifyButton() {
  const params = useParams();

  const onModify = () => {
  };

  return (
    <Link style={{ textDecoration: 'none' }} href={`./modify?id=${params.id}`} passHref={true}>
      <Button onClick={onModify} size={'medium'}>수정하기</Button>
    </Link>
  )
}