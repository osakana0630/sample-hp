import { getArticles, getArticleBySlug } from '@/lib/newt';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/heading';
import { MediaLayout } from '@/components/layouts/media-layout';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { paths } from '@/routes';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tag } from '@/components/ui/tag';
import { HashTag } from '@/components/ui/hash-tag';

export async function generateStaticParams() {
  const { articles } = await getArticles();
  return articles.map((article) => ({
    articleSlug: article.slug,
  }));
}
export const dynamicParams = false;

type Props = {
  params: {
    articleSlug: string;
  };
};

export default async function Page({ params: { articleSlug } }: Props) {
  const article = await getArticleBySlug(articleSlug);
  if (!article) notFound();

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア詳細" labelEn="Media" />}
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'メディア', href: paths.medium.list(1) },
            { name: article.title },
          ]}
        />
      }
    >
      <section>
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">{article.title}</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.body }} />

        <Separator className="my-8" />

        <div className="space-y-4">
          <div>
            <p className="font-semibold">カテゴリ</p>
            <ul className="flex flex-wrap gap-1">
              {article.categories.map((category) => (
                <li key={category._id} className="text-sm text-muted-foreground">
                  <Button variant="ghost" asChild size="sm">
                    <Link href={paths.medium.categories.detail(category.slug, 1)}>
                      <Tag name={category.name} />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">タグ</p>
            <ul className="flex flex-wrap gap-1">
              {article.tags.map((tag) => (
                <li key={tag._id} className="text-sm text-muted-foreground">
                  <Button variant="ghost" asChild size="sm">
                    <Link href={paths.medium.tags.detail(tag.slug, 1)}>
                      <HashTag name={tag.name} />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </MediaLayout>
  );
}
