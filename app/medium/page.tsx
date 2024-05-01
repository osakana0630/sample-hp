import { Heading } from '@/components/heading';
import { getArticles } from '@/lib/newt';
import { MediaLayout } from '@/components/layouts/media-layout';
import { ArticleList } from '@/components/article-list';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';

export default async function Page() {
  const latestArticles = await getArticles();

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
      breadcrumb={<CustomBreadcrumb links={[{ name: 'メディア' }]} />}
    >
      <section>
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">最新の記事</h2>
        <ArticleList articles={latestArticles} />
        {/* TODO pagination */}
      </section>
    </MediaLayout>
  );
}
