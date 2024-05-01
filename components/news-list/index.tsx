import { NewsItem } from '@/components/news-list/news-item';
import { News } from '@/types/news';

type Props = {
  newsList: News[];
};
export function NewsList({ newsList }: Props) {
  return (
    <ul className="col-span-2 space-y-2">
      {newsList.map((news) => (
        <li key={news._id}>
          <NewsItem news={news} />
        </li>
      ))}
    </ul>
  );
}
