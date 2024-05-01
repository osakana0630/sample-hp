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
import { Heading, type HeadingProps } from "@/components/heading";
import { ServiceList } from "@/components/service-list";
import { NewsList } from "@/components/news-list";
import { ArticleList } from "@/components/article-list";
import { paths } from "@/routes";
import { config } from "@/config";
import { StaffCarousel } from "@/components/staff-carousel";

// TODO add metadata
export const metadata: Metadata = {
  title: `${config.companyName}のコーポレートサイト`,
  description: `${config.companyName}のコーポレートサイトです。`,
};

export default async function Home() {
  const [{ news }, categories, staffs] = await Promise.all([
    getNewsList({ limit: 3 }),
    getCategories(),
    getStaffs({ limit: 9 }),
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
      <Section headingProps={{ label: "サービス紹介", labelEn: "Service" }}>
        <ServiceList />
      </Section>

      {/* コンサルタント紹介*/}
      <Section
        headingProps={{ label: "コンサルタント紹介", labelEn: "Consultants" }}
      >
        <div className="mb-6">
          <StaffCarousel staffs={staffs} />
        </div>
        <div className="text-center">
          <Button variant="default" asChild>
            <Link href={paths.staffs.list}>コンサルタント一覧へ</Link>
          </Button>
        </div>
      </Section>

      {/* 企業からのお知らせ */}
      <Section headingProps={{ label: "お知らせ", labelEn: "News" }}>
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
      <Section headingProps={{ label: "メディア", labelEn: "Media" }}>
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
  headingProps: Pick<HeadingProps, "label" | "labelEn">;
  children: React.ReactNode;
};
function Section({ headingProps, children }: SectionProps) {
  return (
    <section>
      <Heading {...headingProps} className="mb-6" component="h2" />
      {children}
    </section>
  );
}
