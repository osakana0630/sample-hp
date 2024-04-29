import { Article } from "@/types/article";
import { ArticleItem } from "@/components/article-list/article-item";

type Props = {
  articles: Article[];
};
export function ArticleList({ articles }: Props) {
  return (
    <ul className="space-y-2 mb-6">
      {articles.map((article) => (
        <ArticleItem key={article._id} article={article} />
      ))}
    </ul>
  );
}
