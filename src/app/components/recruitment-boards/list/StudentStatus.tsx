import styles from './studentStatus.module.scss';

export interface Props {
  studentStatus: string;
}

const studentStatusStyle: {
  [key: string]: string;
} = {
  재학: styles.active,
  휴학: styles.inactive,
  졸업: styles.graduate,
};

export default function StudentStatus({ studentStatus }: Props) {
  return (
    <span className={studentStatusStyle[studentStatus]}>{studentStatus}</span>
  );
}
