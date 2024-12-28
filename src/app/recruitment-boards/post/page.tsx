import Header from '@/app/components/common/header/Header';
import Tabs from '@/app/components/recruitment-boards/post/Tabs';
import { TabsProvider } from '@/app/components/recruitment-boards/post/TabsProvider';
import styles from './page.module.scss';
import PostForm from '@/app/components/recruitment-boards/post/PostForm';

export default function Page() {
  return (
    <div className={styles.page}>
      <Header title="모집글 작성" />
      <TabsProvider>
        <Tabs />
        <div className={styles.form}>
          <PostForm />
        </div>
      </TabsProvider>
    </div>
  );
}
