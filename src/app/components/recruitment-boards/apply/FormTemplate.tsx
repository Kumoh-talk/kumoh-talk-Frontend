'use client';

import styles from './applyForm.module.scss';
import TextInput from '@/app/components/common/textInput/TextInput';
import { useFormStatus } from 'react-dom';

export interface Props {
  formTitles: string[];
}

export default function FormTemplate({ formTitles }: Props) {
  const { pending, data } = useFormStatus();

  return (
    <div className={styles.form}>
      {
        formTitles.map((formTitle, i) => (
          <div className={styles.inputBlock} key={i}>
            <div className={styles.title}>{formTitle}</div>
            <TextInput type={'text'} placeholder={'필수 입력 칸 입니다.'} name={formTitle} required={true}/>
          </div>
        ))
      }
      <button type='submit' disabled={pending}>신청하기</button>
    </div>
  )
}