import { Article } from '@/types/article';
import { ArticleItem } from '@/components/article/article-list/article-item';

type Props = {
  articles: Article[];
};
export function ArticleList({ articles }: Props) {
  return (
    <ul className="space-y-2">
      {articles.length > 0 ? (
        articles.map((article) => (
          <li key={article._id}>
            <ArticleItem article={article} />
          </li>
        ))
      ) : (
        <li>
          <p className="text-muted-foreground">記事がありません</p>
        </li>
      )}
    </ul>
  );
}
