'use client';

import Label from '../Label/Label';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Checkbox from '../Checkbox/Checkbox';
import Button from '@/app/components/common/button/Button';
import { departments, grades } from '../../../apply/_constants/selectValues';
import { getUpcomingWeekdayDates } from '@/app/lib/utils/dateUtils';
import styles from './FormFields.module.scss';

const FormFields = () => {
  const dates = getUpcomingWeekdayDates(4, 3).map((date) => ({
    value: date,
    label: `${date} (목)`,
  }));

  return (
    <>
      <div className={styles.fields}>
        <div className={styles.formField}>
          <Label>학과</Label>
          <Select options={departments} />
        </div>
        <div className={styles.row}>
          <div className={styles.formField}>
            <Label>학년</Label>
            <Select options={grades} />
          </div>
          <div className={styles.formField}>
            <Label>발표 희망 날짜</Label>
            <Select options={dates} />
          </div>
        </div>
        <div className={styles.formField}>
          <Label>학번</Label>
          <Input />
        </div>
        <div className={styles.formField}>
          <Label>전화번호</Label>
          <Input />
        </div>
        <div className={styles.formField}>
          <Label>발표하고 싶은 주제</Label>
          <Input />
        </div>
        <div className={styles.formField}>
          <Label>발표 주제의 이름</Label>
          <Input />
        </div>
        <div className={styles.formField}>
          <Label>예상 소요 시간</Label>
          <Input />
        </div>
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
