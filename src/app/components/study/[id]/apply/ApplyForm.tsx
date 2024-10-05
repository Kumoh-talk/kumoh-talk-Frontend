import FormTemplate from './FormTemplate';
import TextInput from '@/app/components/common/textInput/TextInput';
import styles from '@/app/components/study/[id]/apply/applyForm.module.scss';
import CheckBoxInput from '@/app/components/common/checkboxInput/CheckBoxInput';

const applyFormTitles = [ '이름', '학과', '학년', '학번', '재학상태', '전화번호', '지원동기' ];

export default function ApplyForm() {
  const submit = async (formData: FormData) => {
    'use server';
    console.log(formData.get('학과'));
  };

  return (
    <form action={submit}>
      <div className={styles.form}>
        <div className={styles.inputBlock}>
          <div className={styles.title}>이름</div>
          <TextInput type={'text'} placeholder={'필수 입력 칸 입니다.'} name={'이름'} required={true}/>
        </div>
        <div className={styles.inputBlock}>
          <div className={styles.title}>학과</div>
          <TextInput type={'text'} placeholder={'필수 입력 칸 입니다.'} name={'학과'} required={true}/>
        </div>
        <div className={styles.gradeInputBlock}>
          <div className={styles.grade}>
            <div className={styles.title}>학년</div>
            <TextInput type={'text'} placeholder={'필수 입력 칸 입니다.'} name={'학년'} required={true}/>
          </div>
          <div className={styles.number}>
            <div className={styles.title}>학번</div>
            <TextInput type={'text'} placeholder={'필수 입력 칸 입니다.'} name={'학번'} required={true}/>
          </div>
        </div>
      </div>
      <CheckBoxInput selectList={['체크해주세요', '체크해주세요']} />
      <FormTemplate formTitles={applyFormTitles.slice(3,)}/>
    </form>
  )
}