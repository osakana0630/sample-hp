import Link from "next/link";
import {
  getArticlesByCategoryIds,
  getCategories,
  getNewsList,
  getStaffs,
} from "@/lib/newt";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BasicLayout from "@/components/layout/basic-layout";
import { CATEGORIES } from "@/constants/category";
import { Heading } from "@/components/heading";
import { ServiceList } from "@/components/service-list";
import { StaffList } from "@/components/staff-list";
import { NewsList } from "@/components/news-list";
import { ArticleList } from "@/components/article-list";
import { paths } from "@/routes";

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
    getArticlesByCategoryIds(
      (jobSeekerInterviewCategory?._id && [jobSeekerInterviewCategory?._id]) ||
        [],
    ),
    getArticlesByCategoryIds(
      (companyInterviewCategory?._id && [companyInterviewCategory?._id]) || [],
    ),
  ]);

  return (
    <BasicLayout bgImageSrc="/images/hero.jpg" isHome>
      {/* 事業紹介 */}
      <section className="container py-10">
        <Heading
          className="mb-6"
          label="サービス紹介"
          labelEn="Service"
          component="h2"
        />
        <ServiceList />
      </section>

      {/* コンサルタント紹介*/}
      <section className="container py-10">
        <Heading
          className="mb-6"
          label="コンサルタント紹介"
          labelEn="Consultants"
          component="h2"
        />
        <div className="mb-6">
          <StaffList staffs={staffs} />
        </div>
        <div className="text-center">
          <Button variant="default" asChild>
            <Link href={paths.staffs.list}>コンサルタント一覧へ</Link>
          </Button>
        </div>
      </section>

      {/* 企業からのお知らせ */}
      <section className="container">
        <Heading
          className="mb-6"
          label="お知らせ"
          labelEn="News"
          component="h2"
        />
        <NewsList newsList={news} />
      </section>

      {/* メディア */}
      <section className="container py-10">
        <Heading
          className="mb-6"
          label="メディア"
          labelEn="media"
          component="h2"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 求職者様インタビュー */}
          <div>
            <Heading
              className="mb-6"
              label="求職者様インタビュー"
              labelEn=""
              component="h2"
            />
            <div className="mb-6">
              <ArticleList articles={jobSeekerInterviews} />
            </div>
            <div className="text-right">
              <Button variant="default" asChild>
                <Link href={paths.staffs.list}>一覧へ</Link>
              </Button>
            </div>
          </div>
          {/* 紹介企業様インタビュー */}
          <div>
            <Heading
              className="mb-6"
              label="紹介企業様インタビュー"
              labelEn=""
              component="h2"
            />
            <div className="mb-6">
              <ArticleList articles={companyInterviews} />
            </div>
            <div className="text-right">
              <Button variant="default" asChild>
                <Link href={paths.staffs.list}>一覧へ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
}
