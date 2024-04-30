import Link from "next/link";
import {
  getArticlesByCategoryIds,
  getCategories,
  getNewsList,
  getStaffs,
} from "@/lib/newt";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { CATEGORIES } from "@/constants/category";
import { Heading } from "@/components/heading";
import { ServiceList } from "@/components/service-list";
import { StaffList } from "@/components/staff-list";
import { NewsList } from "@/components/news-list";
import { ArticleList } from "@/components/article-list";
import { paths } from "@/routes";
import { config } from "@/config";

// TODO add metadata
export const metadata: Metadata = {
  title: `${config.companyName}のコーポレートサイト`,
  description: `${config.companyName}のコーポレートサイトです。`,
};

export default async function Home() {
  const [{ news }, categories, staffs] = await Promise.all([
    getNewsList(1),
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
      <Section
        heading={
          <Heading
            className="mb-6"
            label="サービス紹介"
            labelEn="Service"
            component="h2"
          />
        }
      >
        <ServiceList />
      </Section>

      {/* コンサルタント紹介*/}
      <Section
        heading={
          <Heading
            className="mb-6"
            label="コンサルタント紹介"
            labelEn="Consultants"
            component="h2"
          />
        }
      >
        <div className="mb-6">
          <StaffList staffs={staffs} />
        </div>
        <div className="text-center">
          <Button variant="default" asChild>
            <Link href={paths.staffs.list}>コンサルタント一覧へ</Link>
          </Button>
        </div>
      </Section>

      {/* 企業からのお知らせ */}
      <Section
        heading={
          <Heading
            className="mb-6"
            label="お知らせ"
            labelEn="News"
            component="h2"
          />
        }
      >
        <div className="mb-6">
          <NewsList newsList={news} />
        </div>
        <div className="text-center">
          <Button variant="default" asChild>
            <Link href={paths.newsList(1)}>お知らせ一覧へ</Link>
          </Button>
        </div>
      </Section>

      {/* メディア */}
      <Section
        heading={
          <Heading
            className="mb-6"
            label="メディア"
            labelEn="media"
            component="h2"
          />
        }
      >
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
                <Link
                  href={paths.medium.categories.detail(
                    CATEGORIES["jobSeekerInterview"],
                  )}
                >
                  一覧へ
                </Link>
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
                <Link
                  href={paths.medium.categories.detail(
                    CATEGORIES["companyInterview"],
                  )}
                >
                  一覧へ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </BasicLayout>
  );
}

type SectionProps = {
  heading: React.ReactNode;
  children: React.ReactNode;
};
function Section({ heading, children }: SectionProps) {
  return (
    <section>
      {heading}
      {children}
    </section>
  );
}
