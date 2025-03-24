import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
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
      <Header title='공지사항' />
      <main className={styles.layout}>
        <Board boardId ={Number(id)}/>
      </main>
      <Footer />
    </>
  );
}
