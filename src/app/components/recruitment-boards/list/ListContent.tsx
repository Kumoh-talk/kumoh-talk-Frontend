import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './listContent.module.scss';
import Link from 'next/link';

export default function ListContent() {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list/${'applicantId'}?id=${'게시물ID'}&boardType=${'게시물 타입'}`}
      passHref={true}
    >
      <div className={styles.contentBlock}>
        <div className={styles.profile}>
          <ProfileImage />
          <p className={styles.name}>황용진</p>
        </div>
        <p>컴퓨터공학과</p>
        <p>3학년</p>
        <p>20201287</p>
        <p>010 1234 5678</p>
        <p>재학중</p>
      </div>
    </Link>
  );
}
