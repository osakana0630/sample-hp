import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { TrendingArticleList } from "@/components/trending-article-list";
import Link from "next/link";
import { paths } from "@/routes";
import { getArticles, getCategories, getTags } from "@/lib/newt";

export async function RightSection() {
  const [articles, categories, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);
  // 最新の5件の記事を取得 TODO: 本来はページネーションを実装する
  const slicedArticles = articles.slice(0, 3);

  return (
    <>
      <Section>
        <div className="flex gap-1">
          <Input />
          <Button size="icon">
            <Search size={20} />
          </Button>
        </div>
      </Section>

      <Section title="よく読まれている記事">
        <TrendingArticleList articles={slicedArticles} />
      </Section>

      <Section title="カテゴリ一覧">
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="text-sm text-muted-foreground">
              <Button variant="ghost" asChild size="sm">
                <Link href={paths.medium.categories.detail(category.slug)}>
                  <span className="text-sm">{category.name}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="タグ一覧">
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <li key={tag._id} className="text-sm text-muted-foreground">
              <Button variant="ghost" asChild size="sm">
                <Link href={paths.medium.tags.detail(tag.slug)}>
                  <span className="text-sm">#{tag.name}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};
function Section({ title, children }: SectionProps) {
  return (
    <section>
      {title && <h2 className="text-md font-semibold mb-3">{title}</h2>}
      {children}
    </section>
  );
}
