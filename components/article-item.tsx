import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";

type ArticleItemProps = {
  article: Article;
};
export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <li
      key={article._id}
      className="relative rounded-lg border p-4 hover:bg-accent"
    >
      <h3>
        <Link href={`articles/${article.slug}`}>
          {article.title}
          <span className="absolute inset-0" />
        </Link>
      </h3>
      <time className="text-sm text-muted-foreground">
        {format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}
      </time>
      {/*<div>{article.body}</div>*/}
    </li>
  );
}
