import { Suspense } from 'react';
import ArticleSection from './articleSection/ArticleSection';
import styles from './tabContentArticle.module.scss';
import ArticleSectionSuspense from './articleSection/ArticleSection.suspense';

export default function TabContentArticle() {
  return (
    <section className={styles.article}>
      <Suspense
        fallback={
          <ArticleSectionSuspense
            title="멘토링"
            category="MENTORING"
            size="large"
          />
        }
      >
        <ArticleSection title="멘토링" category="MENTORING" size="large" />
      </Suspense>
      <Suspense
        fallback={
          <ArticleSectionSuspense title="프로젝트" category="PROJECT" />
        }
      >
        <ArticleSection title="프로젝트" category="PROJECT" />
      </Suspense>
      <Suspense
        fallback={<ArticleSectionSuspense title="스터디" category="STUDY" />}
      >
        <ArticleSection title="스터디" category="STUDY" />
      </Suspense>
    </section>
  );
}
