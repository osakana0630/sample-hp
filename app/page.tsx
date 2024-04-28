import Link from "next/link";
import { getArticles, getCategories, getStaffs } from "@/lib/newt";
import type { Metadata } from "next";
import { format } from "date-fns";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArticleItem } from "@/components/article-item";

export const metadata: Metadata = {
  title: "Newt・Next.jsブログ",
  description: "NewtとNext.jsを利用したブログです",
};

export default async function Home() {
  const [articles, staffs] = await Promise.all([getArticles(), getStaffs()]);
  return (
    <main>
      <section className="container py-10">
        <h2 className="font-bold text-3xl mb-6">スタッフ一覧</h2>
        <ul className="grid grid-cols-5 gap-6">
          {staffs.map((staff) => (
            <li
              key={staff._id}
              className="relative rounded-lg border p-4 hover:bg-accent"
            >
              <div className="aspect-square overflow-hidden border rounded-lg bg-muted mb-4 relative">
                <Image
                  src={staff.profileImage.src}
                  alt={staff.fullName}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3>
                <Link href={`staffs/${staff._id}`}>
                  {staff.fullName}
                  <span className="absolute inset-0" />
                </Link>
              </h3>
              <time className="text-sm text-muted-foreground">
                {format(new Date(staff._sys.createdAt), "yyyy年MM月dd日")}
              </time>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <h2 className="font-bold text-3xl mb-6">企業からのお知らせ</h2>
        <div className="grid gap-6 grid-cols-3">
          <ul className="space-y-2 col-span-2">
            {articles.map((article) => (
              <ArticleItem key={article._id} article={article} />
            ))}
          </ul>
          <div>
            <h2 className="font-bold text-3xl mb-6">カテゴリ一覧</h2>
            <ul className="space-y-2">
              {(await getCategories()).map((category) => (
                <li key={category._id}>
                  <Button asChild>
                    <Link href={`/news/${category._id}`}>{category.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
