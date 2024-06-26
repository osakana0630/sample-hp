import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/routes';
import { Article } from '@/types/article';

type Props = {
  articles: Article[];
};
export function RecommendedArticleList({ articles }: Props) {
  return (
    <ul className="space-y-2">
      {articles.map((article) => (
        <li
          key={article._id}
          className="relative mx-auto rounded-lg border p-4 duration-100 hover:bg-accent hover:shadow-lg"
        >
          <article className="grid gap-8">
            <div className="flex flex-row gap-4 lg:gap-6">
              {/* 画像領域 */}
              <div className="group relative aspect-square w-16 shrink-0 self-start overflow-hidden rounded-lg bg-muted md:w-20 lg:w-16">
                <Image
                  src={article.coverImage.src}
                  alt={article.title}
                  fill
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* テキスト領域 */}
              <div className="flex flex-col gap-2">
                <h3 className="lg:text-md line-clamp-2 text-sm text-muted-foreground">
                  <Link href={paths.medium.detail(article.slug)}>
                    {article.title}
                    <span className="absolute inset-0" />
                  </Link>
                </h3>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
