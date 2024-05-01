import { MediaLayout } from "@/components/layouts/media-layout";
import { getArticlesByTagIds, getTagBySlug, getTags } from "@/lib/newt";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/article-list";
import { Heading } from "@/components/heading";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { paths } from "@/routes";

type Props = {
  params: { tagSlug: string };
};

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    tagSlug: tag.slug,
  }));
}
export const dynamicParams = false;

export default async function Page({ params: { tagSlug } }: Props) {
  const tag = await getTagBySlug(tagSlug);
  if (!tag) notFound();
  const articles = await getArticlesByTagIds([tag._id]);
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: "メディア", href: paths.medium.list },
            { name: "タグ" },
            { name: tag.name },
          ]}
        />
      }
    >
      <section>
        <h2 className="font-semibold text-2xl mb-6">
          「{tag.name}」の記事一覧
        </h2>
        {hasArticles ? (
          <ArticleList articles={articles} />
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </section>
    </MediaLayout>
  );
}
