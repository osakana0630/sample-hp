import { Heading } from '@/components/heading';
import { getArticles } from '@/lib/newt';
import { MediaLayout } from '@/components/layouts/media-layout';
import { ArticleList } from '@/components/article-list';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
// import { paths } from '@/routes';
// import { ARTICLES_PER_PAGE } from '@/constants/pagination';
// import { Pagination } from '@/components/custom-pagination';

export default async function Page() {
  const { articles: latestArticles } = await getArticles();

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
      breadcrumb={<CustomBreadcrumb links={[{ name: 'メディア' }]} />}
    >
      <section>
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">最新の記事</h2>
        <ArticleList articles={latestArticles} />
        {/* TODO pagination */}
        {/*<Pagination*/}
        {/*  totalItems={total}*/}
        {/*  currentPage={currentPage}*/}
        {/*  baseUrl={paths.medium.search}*/}
        {/*  itemsPerPage={ARTICLES_PER_PAGE}*/}
        {/*  isSSG={false}*/}
        {/*/>*/}
      </section>
    </MediaLayout>
  );
}
