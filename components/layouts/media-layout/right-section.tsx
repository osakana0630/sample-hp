import { Button } from '@/components/ui/button';
import { RecommendedArticleList } from '../../article/recommended-article-list';
import Link from 'next/link';
import { paths } from '@/routes';
import { getArticles, getCategories, getRecommendedArticles, getTags } from '@/lib/newt';
import { SearchBox } from '@/components/search-box';

export async function RightSection() {
  const [{ articles }, { recommendedArticles }, { categories }, { tags }] =
    await Promise.all([
      getArticles({ limit: 3 }),
      getRecommendedArticles(),
      getCategories(),
      getTags(),
    ]);

  return (
    <>
      <Section>
        <SearchBox />
      </Section>

      <Section title="おすすめ記事">
        <RecommendedArticleList articles={recommendedArticles} />
      </Section>

      <Section title="カテゴリ">
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="text-sm text-muted-foreground">
              <Button variant="ghost" asChild size="sm">
                <Link href={paths.medium.categories.detail(category.slug, 1)}>
                  <span className="text-sm">{category.name}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="タグ">
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <li key={tag._id} className="text-sm text-muted-foreground">
              <Button variant="ghost" asChild size="sm">
                <Link href={paths.medium.tags.detail(tag.slug, 1)}>
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
