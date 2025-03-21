import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import styles from './Title.module.scss';

const Title = () => {
  const { title, setTitle } = usePostContent();

  return (
    <input
      className={styles.title}
      maxLength={50}
      placeholder='제목을 입력하세요'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default Title;
