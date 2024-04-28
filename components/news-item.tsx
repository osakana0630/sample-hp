import Link from "next/link";
import { format } from "date-fns";
import { News } from "@/types/news";

type NewsItemProps = {
  news: News;
};
export function NewsItem({ news }: NewsItemProps) {
  return (
    <li
      key={news._id}
      className="relative rounded-lg border p-4 hover:bg-accent"
    >
      <h3>
        <Link href={`news/${news.slug}`}>
          {news.title}
          <span className="absolute inset-0" />
        </Link>
      </h3>
      <time className="text-sm text-muted-foreground">
        {format(new Date(news._sys.createdAt), "yyyy年MM月dd日")}
      </time>
      {/*<div>{news.body}</div>*/}
    </li>
  );
}
