import { Article } from '@/types/article';
import { ArticleItem } from '@/components/article-list/article-item';

type Props = {
  articles: Article[];
};
export function ArticleList({ articles }: Props) {
  return (
    <ul className="space-y-2">
      {articles.map((article) => (
        <li key={article._id}>
          <ArticleItem article={article} />
        </li>
      ))}
    </ul>
  );
}
