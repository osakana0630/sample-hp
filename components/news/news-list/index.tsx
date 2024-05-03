import { NewsItem } from '@/components/news/news-list/news-item';
import { News } from '@/types/news';

type Props = {
  newsList: News[];
};
export function NewsList({ newsList }: Props) {
  return (
    <ul className="col-span-2 space-y-2">
      {newsList.length > 0 ? (
        newsList.map((news) => (
          <li key={news._id}>
            <NewsItem news={news} />
          </li>
        ))
      ) : (
        <li>
          <p className="text-muted-foreground">お知らせはありません</p>
        </li>
      )}
    </ul>
  );
}
