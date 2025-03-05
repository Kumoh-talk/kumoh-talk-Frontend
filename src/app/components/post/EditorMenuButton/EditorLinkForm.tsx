import Button from '../../common/button/Button';
import CheckSvg from '@/app/assets/svg/CheckSvg';
import styles from './EditorMenuButton.module.scss';

const EditorLinkForm = () => {
  return (
    <form>
      <input type='url' placeholder='URL' value='' onChange={() => {}} />
      <label>
        <input type='checkbox' checked={false} onChange={() => {}} />
        <div className={styles.iconWrapper}>
          <CheckSvg />
        </div>
        새 창으로 열기
      </label>
      <div className={styles.buttonGroup}>
        <Button
          type='submit'
          color='text-black-50'
          bgColor='bg-white'
          disabled={false}
          onClick={() => {}}
        >
          확인
        </Button>
      </div>
    </form>
  );
};

export default EditorLinkForm;
