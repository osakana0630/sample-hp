import { getArticlesByCategory } from "@/lib/newt";
import Link from "next/link";
import { format } from "date-fns";

export default async function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  const articles = await getArticlesByCategory(category);
  return (
    <div className="container max-w-2xl py-10">
      <h1 className="mb-6 font-bold text-2xl">「{category}」の記事一覧</h1>
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
