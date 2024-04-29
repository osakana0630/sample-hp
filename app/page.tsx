import Link from "next/link";
import {
  getArticlesByCategory,
  getCategories,
  getNewsList,
  getStaffs,
} from "@/lib/newt";
import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArticleItem } from "@/components/article-item";
import BasicLayout from "@/components/layout/basic-layout";
import { NewsItem } from "@/components/news-item";
import { StaffItem } from "@/components/staff-item";
import { CATEGORIES } from "@/constants/category";
import { BUSINESSES } from "@/constants/business";
import { Heading } from "@/components/heading";

export const metadata: Metadata = {
  title: "株式会社〇〇のコーポレートサイト",
  description: "株式会社〇〇のコーポレートサイトです。",
};

export default async function Home() {
  const [news, categories, staffs] = await Promise.all([
    getNewsList(),
    getCategories(),
    getStaffs(0, 9),
  ]);
  const jobSeekerInterviewCategory = categories.find(
    (category) => category.slug === CATEGORIES["jobSeekerInterview"],
  );
  const companyInterviewCategory = categories.find(
    (category) => category.slug === CATEGORIES["companyInterview"],
  );
  const [jobSeekerInterviews, companyInterviews] = await Promise.all([
    getArticlesByCategory(jobSeekerInterviewCategory?._id || ""),
    getArticlesByCategory(companyInterviewCategory?._id || ""),
  ]);

  return (
    <BasicLayout bgImageSrc="/images/hero.jpg" isHome>
      {/* 事業紹介 */}
      <section className="container py-10">
        <Heading label="サービス紹介" labelEn="Service" />
        <ul className="space-y-6">
          {BUSINESSES.map((business) => (
            <li
              key={business.label}
              className="grid grid-cols-1 md:grid-cols-3 p-4 gap-6 rounded-lg"
            >
              <div className="relative aspect-video w-full self-start overflow-hidden rounded-lg border">
                <Image
                  src={business.image}
                  alt={business.label}
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="md:col-span-2">
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
        <Heading label="コンサルタント紹介" labelEn="Consultants" />
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
        <Heading label="お知らせ" labelEn="News" />
        <div className="grid grid-cols-1">
          <ul className="space-y-2 col-span-2">
            {news.map((news) => (
              <NewsItem key={news._id} news={news} />
            ))}
          </ul>
        </div>
      </section>

      {/* メディア */}
      <section className="container py-10">
        <Heading label="メディア" labelEn="media" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 求職者様インタビュー */}
          <div>
            <Heading label="求職者様インタビュー" labelEn="" />
            <ul className="space-y-2 mb-6">
              {jobSeekerInterviews.map((article) => (
                <ArticleItem key={article._id} article={article} />
              ))}
            </ul>
            <div className="text-right">
              <Button variant="default" asChild>
                <Link href={"/staffs"}>一覧へ</Link>
              </Button>
            </div>
          </div>
          {/* 紹介企業様インタビュー */}
          <div>
            <Heading label="紹介企業様インタビュー" labelEn="" />
            <ul className="space-y-2 mb-6">
              {companyInterviews.map((article) => (
                <ArticleItem key={article._id} article={article} />
              ))}
            </ul>
            <div className="text-right">
              <Button variant="default" asChild>
                <Link href={"/staffs"}>一覧へ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
}
