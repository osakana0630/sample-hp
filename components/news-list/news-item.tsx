import Link from 'next/link';
import { format } from 'date-fns';
import { News } from '@/types/news';
import { paths } from '@/routes';

type NewsItemProps = {
  news: News;
};
export function NewsItem({ news }: NewsItemProps) {
  return (
    <article
      key={news._id}
      className="relative rounded-lg border p-4 duration-100 hover:bg-accent hover:shadow-sm"
    >
      <h3 className="line-clamp-1 text-sm">
        <Link href={paths.news.detail(news._id)}>
          {news.title}
          <span className="absolute inset-0" />
        </Link>
      </h3>
      <time className="text-sm text-muted-foreground">
        {format(new Date(news._sys.createdAt), 'yyyy年MM月dd日')}
      </time>
    </article>
  );
}
