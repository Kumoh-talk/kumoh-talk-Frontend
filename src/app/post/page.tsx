import Header from '../components/post/Header/Header';
import styles from './page.module.scss';

export default function Post() {
  return (
    <>
      <Header />
      <div>에디터 메뉴</div>
      <main className={styles.layout}>
        <div className={styles.content}>
          <input className={styles.title} placeholder='제목을 입력하세요' />
          <div className={styles.editorContainer}>에디터</div>
          <div>해시태그</div>
        </div>
      </main>
    </>
  );
}
