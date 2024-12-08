import styles from './page.module.scss';
import {
  RecruitmentBoardDetailProvider
} from '@/app/components/recruitment-boards/detail/RecruitmentBoardDetailProvider';
import ApplyListContainer from '@/app/components/recruitment-boards/list/ApplyListContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';

export default function Page() {
  return (
    <>
      <Header title={`신청서 확인`}/>
      <main className={styles.block}>
        <RecruitmentBoardDetailProvider>
          <ApplyListContainer/>
        </RecruitmentBoardDetailProvider>
      </main>
      <Footer/>
    </>
  )
}