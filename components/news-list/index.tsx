import { NewsItem } from "@/components/news-list/news-item";
import { News } from "@/types/news";

type Props = {
  newsList: News[];
};
export function NewsList({ newsList }: Props) {
  return (
    <ul className="space-y-2 col-span-2">
      {newsList.map((news) => (
        <NewsItem key={news._id} news={news} />
      ))}
    </ul>
  );
}
