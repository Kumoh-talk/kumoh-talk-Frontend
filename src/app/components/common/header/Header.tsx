import Link from 'next/link';
import Alert from './alert/alert';
import SearchBar from './searchBar/SearchBar';
import Background from './background/Background';
import LoginArea from './loginArea/LoginArea';
import styles from './header.module.scss';
import NewsletterArea from './newsletterArea/NewsletterArea';

export interface Props {
  title?: string;
}

export default function Header({ title = '' }: Props) {
  return (
    <Background className={styles.header} alwaysVisible={!!title}>
      <div className={styles.left}>
        <Link href="/">야밤의 금오톡</Link>
        {title && (
          <Link href="." className={styles.title}>
            {title}
          </Link>
        )}
      </div>
      <div className={styles.right}>
        <LoginArea />
        <NewsletterArea />
        <div className={styles.line}></div>
        {/* <SearchBar /> */}
        <Alert />
      </div>
    </Background>
  );
}
