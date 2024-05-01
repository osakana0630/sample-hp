import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@/types/article";
import Image from "next/image";
import { paths } from "@/routes";
import { Tag } from "@/components/ui/tag";
import { HashTag } from "@/components/ui/hash-tag";
import { Button } from "@/components/ui/button";

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
          <div className="group relative h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-40 md:w-40">
            <Image
              src={article.coverImage.src}
              alt={article.title}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-2">
            <time className="text-sm text-muted-foreground">
              {format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}
            </time>

            <h3 className="text-xl font-bold line-clamp-2">
              <Link href={paths.medium.detail(article.slug)}>
                {article.title}
                <span className="absolute inset-0" />
              </Link>
            </h3>

            {/* カテゴリタグ */}
            <div className="z-10">
              {article.categories.map((category) => (
                <Button
                  key={category._id}
                  variant="ghost"
                  asChild
                  className="p-0"
                >
                  <Link
                    href={paths.medium.categories.detail(category.slug)}
                    className="h-auto"
                  >
                    <Tag name={category.name} />
                  </Link>
                </Button>
              ))}
            </div>

            {/*ハッシュタグ*/}
            <div className="z-10">
              {article.tags.map((tag) => (
                <Button
                  key={tag._id}
                  variant="link"
                  asChild
                  className="p-0 mr-2"
                >
                  <Link
                    href={paths.medium.tags.detail(tag.slug)}
                    className="h-auto"
                  >
                    <HashTag key={tag._id} name={tag.name} />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
