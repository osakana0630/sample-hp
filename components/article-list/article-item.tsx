import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import Image from "next/image";

type ArticleItemProps = {
  article: Article;
};
export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <div
      key={article._id}
      className="relative mx-auto p-4 border rounded-lg hover:bg-accent hover:shadow-lg duration-100"
    >
      <div className="grid gap-8">
        <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
          <div className="group relative h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
            <Image
              src={article.coverImage.src}
              alt={article.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-2">
            <time className="text-sm text-gray-400">
              {format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}
            </time>

            <h3 className="text-xl font-bold text-gray-800">
              <Link href={`articles/${article._id}`}>
                {article.title}
                <span className="absolute inset-0" />
              </Link>
            </h3>

            <div>
              {article.categories.map((category) => (
                <span
                  key={category._id}
                  className="text-xs text-muted-foreground bg-muted border rounded-lg inline-block p-1"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
