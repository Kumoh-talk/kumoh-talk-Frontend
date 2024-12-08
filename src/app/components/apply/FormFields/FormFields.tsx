'use client';

import { useFormContext } from 'react-hook-form';
import Checkbox from '../Checkbox/Checkbox';
import Button from '@/app/components/common/button/Button';
import InputField from '../Field/InputField';
import SelectField from '../Field/SelectField';
import { departments, grades } from '@/app/lib/constants/apply/selectValues';
import { getUpcomingWeekdayDates } from '@/app/lib/utils/dateUtils';
import styles from './FormFields.module.scss';

const FormFields = () => {
  const form = useFormContext();
  const dates = getUpcomingWeekdayDates(4, 3).map((date) => ({
    value: date,
    label: `${date} (목)`,
  }));

  return (
    <>
      <div className={styles.fields}>
        <div className={styles.row}>
          <InputField control={form.control} name='studentId' label='학번' />
          <SelectField
            control={form.control}
            name='department'
            label='학과'
            options={departments}
          />
        </div>
        <div className={styles.row}>
          <SelectField
            control={form.control}
            name='grade'
            label='학년'
            options={grades}
          />
          <SelectField
            control={form.control}
            name='preferredDate'
            label='발표 희망 날짜'
            options={dates}
          />
        </div>
        <InputField
          control={form.control}
          name='phoneNumber'
          label='전화번호'
        />
        <InputField
          control={form.control}
          name='presentationTopic'
          label='발표하고 싶은 주제'
        />
        <InputField
          control={form.control}
          name='seminarName'
          label='발표 주제의 이름'
        />
        <InputField
          control={form.control}
          name='estimatedDuration'
          label='예상 소요 시간'
        />
        <div className={styles.row}>
          <Checkbox>야밤의 금오톡 게시글 작성 여부</Checkbox>
          <Checkbox>
            발표한 내용 유튜브 및 야밤의 금오톡 업로드 동의 여부
          </Checkbox>
        </div>
      </div>
      <Button size='medium' onClick={() => {}}>
        신청하기
      </Button>
    </>
  );
};

export default FormFields;
