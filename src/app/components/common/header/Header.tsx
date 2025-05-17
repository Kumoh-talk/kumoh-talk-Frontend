import Link from 'next/link';
import Alert from './alert/alert';
import SearchBar from './searchBar/SearchBar';
import Background from './background/Background';
import LoginArea from './loginArea/LoginArea';
import styles from './header.module.scss';
import NewsletterArea from './newsletterArea/NewsletterArea';
import WriteArea from './writeArea/WriteArea';

export interface Props {
  title?: string;
  alwaysVisible?: boolean;
}

export default function Header({ title = '', alwaysVisible = true }: Props) {
  return (
    <Background className={styles.header} alwaysVisible={alwaysVisible}>
      <div className={styles.left}>
        <Link href='/'>야밤의 금오톡</Link>
        {title && (
          <Link href='.' className={styles.title}>
            {title}
          </Link>
        )}
      </div>
      <div className={styles.right}>
        <Link href='/streaming'>Live</Link>
        <LoginArea />
        <NewsletterArea />
        <WriteArea />
        <div className={styles.line}></div>
        {/* <SearchBar /> */}
        <Alert />
      </div>
    </Background>
  );
}
