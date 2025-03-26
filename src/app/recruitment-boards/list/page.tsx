import styles from './page.module.scss';
import ApplyListContainer from '@/app/components/recruitment-boards/list/ApplyListContainer';
import Header from '@/app/components/common/header/Header';
import Footer from '@/app/components/common/footer/Footer';
import { getRecruitmentBoardApplicantList } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';
import { cookies } from 'next/headers';
import ListPagination from '@/app/components/recruitment-boards/list/ListPagination';
import { RecruitmentTag } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '야밤의금오톡 신청서 확인',
  description: '야밤의금오톡에 등록된 신청서를 확인해보세요',
  openGraph: {
    title: '야밤의금오톡 신청서 확인',
    description: '야밤의금오톡에 등록된 신청서를 확인해보세요',
    images: ['/logo_dark_2.webp'],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
    title: string;
    boardType: RecruitmentTag;
    tag: RecruitmentTag;
    name: string;
    page: string;
    sort: string;
  }>;
}) {
  const { id, title, boardType, tag, name, page, sort } = await searchParams;
  const pageContent: ApplyListApi = await getRecruitmentBoardApplicantList(
    id,
    Number(page),
    sort,
    cookies().toString()
  );

  return (
    <div className={styles.page}>
      <Header title={`신청서 확인`} />
      <main className={styles.block}>
        <ApplyListContainer
          id={id}
          title={title}
          boardType={boardType}
          tag={tag}
          name={name}
          pageContent={pageContent}
        />
        <ListPagination
          totalPage={pageContent.data.totalPage}
          searchParams={searchParams}
        />
      </main>
      <Footer />
    </div>
  );
}
