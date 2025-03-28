import Header from '@/app/components/common/header/Header';
import ApplyBanner from '@/app/components/front/applyBanner/ApplyBanner';
import Board from '@/app/components/notice/Board';
import styles from './page.module.scss';

interface NoticePageProps {
  params: {
    id: string;
  };
}

export default function Notice({ params }: NoticePageProps) {
  const { id } = params;

  return (
    <>
      <Header title='공지사항' alwaysVisible={false} />
      <main className={styles.main}>
        <header>
          <div className={styles.logo}></div>
          <div className={styles.bannerWrapper}>
            <ApplyBanner />
          </div>
        </header>
        <Board boardId ={Number(id)}/>
      </main>
    </>
  );
}
