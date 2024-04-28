import Link from "next/link";
import { getArticles, getCategories, getNews, getStaffs } from "@/lib/newt";
import type { Metadata } from "next";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArticleItem } from "@/components/article-item";
import BasicLayout from "@/components/layout/basic-layout";
import { NewsItem } from "@/components/news-item";
import { StaffItem } from "@/components/staff-item";

export const metadata: Metadata = {
  title: "株式会社〇〇のコーポレートサイト",
  description: "株式会社〇〇のコーポレートサイトです。",
};

const BUSINESSES = [
  {
    label: "営業コンサル/営業代行",
    description:
      "営業戦略の設計から実行まで、企業のフェーズやニーズに応じて支援をいたします。\nスタートアップ/ベンチャー企業の支援を最も得意としております。\nインサイドセールスとして顧客のニーズの収集からアポイントの獲得、フィールドセールスとして商談の実施まで柔軟に対応いたしますので、ご相談ください。",
    image: "/images/business1.png",
  },
  {
    label: "人材紹介サービス",
    description:
      "20-30代を中心に、エージェントとしてキャリ構築の支援をいたします。\n全ての人の可能性を最大限高めるべく、これまでのキャリアの棚卸し、これからのキャリア像の言語化を伴走します。\n企業とのマッチングは個人の能力だけでなく、業界の特性や傾向を理解することが大切です。業界経験のあるエージェントが万全の支援をいたします。\n入社までの支援をすることはもちろん、入社後に活躍いただけるようご支援いたします。",
    image: "/images/business2.png",
  },
] as const;

export default async function Home() {
  const [news, articles, staffs] = await Promise.all([
    getNews(),
    getArticles(),
    getStaffs(0, 9),
  ]);
  return (
    <BasicLayout pageTitle="ホーム画面" bgImageSrc="/images/hero.png">
      {/* 事業紹介 */}
      <section className="container py-10">
        <h2 className="font-bold text-3xl mb-6">事業について</h2>
        <ul className="gap-6 space-y-2">
          {BUSINESSES.map((business) => (
            <li
              key={business.label}
              className="flex flex-col lg:flex-row justify-between rounded-lg border p-4 gap-6"
            >
              <div className="aspect-video h-60 lg:h-52 overflow-hidden border rounded-lg bg-muted relative">
                <Image
                  src={business.image}
                  alt={business.label}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{business.label}</h3>
                <p className="text-sm text-muted-foreground leading-8 whitespace-pre-wrap">
                  {business.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* コンサルタント紹介*/}
      <section className="container py-10">
        <h2 className="font-bold text-3xl mb-6">コンサルタント紹介</h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
        <div className="text-center">
          <Button variant="default" asChild>
            <Link href={"/staffs"}>コンサルタント一覧へ</Link>
          </Button>
        </div>
      </section>

      {/* 企業からのお知らせ */}
      <section className="container">
        <h2 className="font-bold text-3xl mb-6">企業からのお知らせ</h2>
        <div className="grid grid-cols-1">
          <ul className="space-y-2 col-span-2">
            {news.map((news) => (
              <NewsItem key={news._id} news={news} />
            ))}
          </ul>
        </div>
      </section>

      {/* メディア */}
      <section className="container py-10 grid grid-cols-2 gap-6">
        {/* 求職者様インタビュー */}
        <div>
          <h2 className="font-bold text-3xl mb-6">求職者様インタビュー</h2>
          <ul className="space-y-2">
            {articles.map((article) => (
              <ArticleItem key={article._id} article={article} />
            ))}
          </ul>
        </div>
        {/* 紹介企業様インタビュー */}
        <div>
          <h2 className="font-bold text-3xl mb-6">紹介企業様インタビュー</h2>
          <ul className="space-y-2 col-span-2">
            {articles.map((article) => (
              <ArticleItem key={article._id} article={article} />
            ))}
          </ul>
        </div>
      </section>
    </BasicLayout>
  );
}
