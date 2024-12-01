import ArticleList from '../components/articles/ArticleList';

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; page?: number; order?: string };
}) {
  return <ArticleList searchParams={searchParams} />;
}
