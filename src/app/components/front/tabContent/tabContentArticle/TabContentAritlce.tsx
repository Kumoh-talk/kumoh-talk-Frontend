import ArticleSection from './articleSection/ArticleSection';
import styles from './tabContentArticle.module.scss';

export default function TabContentArticle() {
  return (
    <section className={styles.article}>
      <ArticleSection title="멘토링" category="MENTORING" size="large" />
      <ArticleSection title="프로젝트" category="PROJECT" />
      <ArticleSection title="스터디" category="STUDY" />
    </section>
  );
}
