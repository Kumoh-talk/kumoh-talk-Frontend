import Link from 'next/link';
import clsx from 'clsx';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import ScrollableList from '../../scrollableList/ScrollableList';
import ArticleCard, { Props } from '../../articleCard/ArticleCard';

import styles from './tabContentArticle.module.scss';

const dummylist: Props[] = [
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 7, 30),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 7, 3),
    endDate: new Date(2024, 7, 25),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 11),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 11),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 11),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
  {
    tags: ['project', 'frontend', 'mobile'],
    title: '해킹 배울 사람',
    description: '해킹 같이 공부할 사람 구합니다',
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 11),
    target: ['컴퓨터공학과', '산업공학과'],
    currentCount: 7,
    maxCount: 10,
    categoryId: 'STUDY',
    articleId: 1,
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/1f13/b887/d636e38c8617c1f6b41143d1c9baee73?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MfmBsR6gBp9vhNsQgdGBrQPu9~88P80lpfV5Y-5hbN~Oig2ODvwMhCMjUhGvIKV6LIt2AozhCG9c--0bQWIJKgH5PshrTSHII-6gss3YnfJF7RRQ8LD~ogNTCBl8o0eH7S3xzxoQHCF62JKwE2AS1JIkS7zzwmCUnH9YIOJlC7X3juajJBjpsHqwOUcXdZMmay-kbNmzHXMIdToIvpvgClDpntOB2xvzk11yP3qAVWZ7pTGiL33RRaReV9i1Ii7VzTvSDTJVHh6rGsmKZKKmj8cfL2JAgjXEbKSQyqE0uvvnYQeIDP1FkV45a9gFvn8o2Gt344jlf3v1uSGpD5QSPQ__',
  },
];

export default function TabContentArticle() {
  return (
    <section className={styles.article}>
      <section className={styles.card}>
        <header>
          <span>멘토링</span>
          <Link href="/articles?category=mentor">
            더 보기
            <PageMoreSvg />
          </Link>
        </header>
        <ScrollableList size="large">
          <ul className={clsx(styles.cardList, styles.large)}>
            {dummylist.slice(0, 4).map((item, index) => (
              <ArticleCard key={index} {...item} size="large" />
            ))}
          </ul>
        </ScrollableList>
      </section>
      <section className={styles.card}>
        <header>
          <span>프로젝트</span>
          <Link href="/articles?category=project">
            더 보기
            <PageMoreSvg />
          </Link>
        </header>
        <ScrollableList>
          <ul className={styles.cardList}>
            {dummylist.map((item, index) => (
              <ArticleCard key={index} {...item} />
            ))}
          </ul>
        </ScrollableList>
      </section>
      <section className={styles.card}>
        <header>
          <span>스터디</span>
          <Link href="/articles?category=study">
            더 보기
            <PageMoreSvg />
          </Link>
        </header>
        <ScrollableList>
          <ul className={styles.cardList}>
            {dummylist.map((item, index) => (
              <ArticleCard key={index} {...item} />
            ))}
          </ul>
        </ScrollableList>
      </section>
    </section>
  );
}
