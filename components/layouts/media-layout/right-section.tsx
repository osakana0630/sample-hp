import { Button } from '@/components/ui/button';
import { TrendingArticleList } from '@/components/trending-article-list';
import Link from 'next/link';
import { paths } from '@/routes';
import { getArticles, getCategories, getTags } from '@/lib/newt';
import { SearchBox } from '@/components/search-box';

export async function RightSection() {
  const [{ articles }, { categories }, tags] = await Promise.all([
    getArticles(),
    getCategories(),
    getTags(),
  ]);
  console.log('サイドバー', { categories });
  // 最新の5件の記事を取得 TODO: 本来はページネーションを実装する
  const slicedArticles = articles.slice(0, 3);

  return (
    <>
      <Section>
        <SearchBox />
      </Section>

      <Section title="よく読まれている記事">
        <TrendingArticleList articles={slicedArticles} />
      </Section>

      <Section title="カテゴリ一覧">
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="text-sm text-muted-foreground">
              <Button variant="ghost" asChild size="sm">
                <Link href={paths.medium.categories.list(category.slug, 1)}>
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
      {title && <h2 className="text-md mb-3 font-semibold">{title}</h2>}
      {children}
    </section>
  );
}
