import MyArticleList from './MyArticleList';

export default function ProfileArticlesContent({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  return (
    <>
      <MyArticleList searchParams={searchParams} />
    </>
  );
}
