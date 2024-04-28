import { searchArticles } from "@/lib/newt";
import Link from "next/link";
import { format } from "date-fns";

export const runtime = 'edge';

export default async function Page({
  searchParams: { q },
}: {
  searchParams: {
    q: string;
  };
}) {
  const articles = await searchArticles(q);
  return (
    <div className="container max-w-lg py-10">
      <h1 className="mb-6 font-bold text-2xl">「{q}」の検索結果</h1>
      <ul className="space-y-2">
        {articles.map((article) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}
