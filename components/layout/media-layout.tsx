import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getArticles, getCategories, getTags } from "@/lib/newt";
import Link from "next/link";
import { ArticleList } from "@/components/article-list";
import { paths } from "@/routes";
import { TrendingArticleList } from "@/components/trending-article-list";

type Props = {
  pageTitle?: string | React.ReactNode;
  leadText?: string;
  bgImageSrc?: string;
  children: React.ReactNode;
};

export async function MediaLayout({
  pageTitle,
  leadText,
  bgImageSrc,
  children,
}: Props) {
  const [articles, categories, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);
  // 最新の5件の記事を取得 TODO: 本来はページネーションを実装する
  const slicedArticles = articles.slice(0, 3);
  console.log({ tags });

  return (
    <>
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          className={`bg-muted w-full h-[150px] flex flex-col justify-center items-center text-center p-4`}
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {pageTitle && typeof pageTitle === "string" ? (
            <h1 className="font-semibold text-xl md:text-2xl  mb-6">
              {pageTitle}
            </h1>
          ) : (
            pageTitle
          )}

          <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap">
            {leadText}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="container py-8 w-full lg:w-[70%]">{children}</div>

        {/*TODO コンポーネント化する */}
        <div className="flex flex-col container py-8 w-full lg:w-[30%] gap-6">
          {/* TODO 検索機能 */}
          <section>
            <div className="flex gap-1">
              <Input />
              <Button size="icon">
                <Search size={20} />
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-md font-semibold">よく読まれている記事</h2>
            {/* TODO レスポンシブ対応 */}
            <TrendingArticleList articles={slicedArticles} />
          </section>

          <section>
            <h2 className="text-md font-semibold">カテゴリ一覧</h2>
            <ul>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="text-sm text-muted-foreground"
                >
                  <Button variant="ghost" asChild size="sm">
                    <Link href={paths.medium.categories.detail(category.slug)}>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-md font-semibold">タグ一覧</h2>
            <ul className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <li key={tag._id} className="text-sm text-muted-foreground">
                  <Button variant="ghost" asChild size="sm">
                    {/* TODO: href */}
                    <Link href={paths.medium.tags.detail(tag.slug)}>
                      <span className="text-sm">#{tag.name}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
