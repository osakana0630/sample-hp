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
      className="relative flex items-center gap-6 rounded-lg border p-4 duration-100 hover:bg-accent hover:shadow-sm"
    >
      <time className="w-24 text-xs text-muted-foreground md:w-28 md:text-sm">
        {format(new Date(news._sys.createdAt), 'yyyy年MM月dd日')}
      </time>
      <h3 className="line-clamp-1 flex-1 text-sm">
        <Link href={paths.news.detail(news._id)}>
          {news.title}
          <span className="absolute inset-0" />
        </Link>
      </h3>
    </article>
  );
}
