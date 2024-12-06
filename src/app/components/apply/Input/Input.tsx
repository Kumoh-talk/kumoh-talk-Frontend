import styles from './Input.module.scss';

const Input = ({ ...props }) => {
  return <input className={styles.input} {...props} placeholder='필수 입력 칸입니다'/>;
};

export default Input;
