import Link from 'next/link';
import {
  getArticlesByCategoryIds,
  getCategories,
  getNewsList,
  getTopThreeStaffs,
} from '@/lib/newt';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { BasicLayout } from '@/components/layouts/basic-layout';
import { CATEGORIES } from '@/constants/category';
import { Heading, type HeadingProps } from '@/components/heading';
import { ServiceList } from '@/components/service-list';
import { NewsList } from '@/components/news-list';
import { ArticleList } from '@/components/article-list';
import { paths } from '@/routes';
import { config } from '@/config';
import { StaffCarousel } from '@/components/staff-carousel';
import { ArrowRight } from 'lucide-react';
import { StaffList } from '@/components/staff-list';

// TODO add metadata
export const metadata: Metadata = {
  title: `${config.companyName}のコーポレートサイト`,
  description: `${config.companyName}のコーポレートサイトです。`,
};

export default async function Home() {
  const [{ news }, { categories }, staffs] = await Promise.all([
    getNewsList({ limit: 3 }),
    getCategories(),
    // 特定の3人のコンサルタントを取得するようにしたい。
    getTopThreeStaffs(),
  ]);
  const jobSeekerInterviewCategory = categories.find(
    (category) => category.slug === CATEGORIES['jobSeekerInterview']
  );
  const companyInterviewCategory = categories.find(
    (category) => category.slug === CATEGORIES['companyInterview']
  );
  const [{ articles: jobSeekerInterviews }, { articles: companyInterviews }] =
    await Promise.all([
      getArticlesByCategoryIds(
        (jobSeekerInterviewCategory?._id && [jobSeekerInterviewCategory?._id]) || [],
        { limit: 3 }
      ),
      getArticlesByCategoryIds(
        (companyInterviewCategory?._id && [companyInterviewCategory?._id]) || [],
        { limit: 3 }
      ),
    ]);

  return (
    <BasicLayout bgImageSrc="/images/hero.jpg" isHome>
      {/* 事業紹介 */}
      <Section headingProps={{ label: 'サービス紹介', labelEn: 'Service' }}>
        <ServiceList />
      </Section>

      {/* コンサルタント紹介*/}
      <Section
        headingProps={{ label: 'コンサルタント紹介', labelEn: 'Consultants' }}
        button={<LinkButton href={paths.staffs.list(1)} />}
      >
        <div className="md:hidden">
          <StaffCarousel staffs={staffs} />
        </div>

        <div className="hidden md:block">
          <StaffList staffs={staffs} />
        </div>
      </Section>

      {/* 企業からのお知らせ */}
      <Section
        headingProps={{ label: 'お知らせ', labelEn: 'News' }}
        button={<LinkButton href={paths.newsList(1)} />}
      >
        <NewsList newsList={news} />
      </Section>

      {/* メディア */}
      <Section headingProps={{ label: 'メディア', labelEn: 'Media' }}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
          {/* 求職者様インタビュー */}
          <Section
            headingProps={{
              label: '求職者様インタビュー',
              labelEn: '',
              component: 'h3',
            }}
            button={
              <LinkButton
                href={paths.medium.categories.detail(CATEGORIES['jobSeekerInterview'], 1)}
              />
            }
          >
            <ArticleList articles={jobSeekerInterviews} />
          </Section>
          {/* 紹介企業様インタビュー */}
          <Section
            headingProps={{
              label: '紹介企業様インタビュー',
              labelEn: '',
              component: 'h3',
            }}
            button={
              <LinkButton
                href={paths.medium.categories.detail(CATEGORIES['companyInterview'], 1)}
              />
            }
          >
            <ArticleList articles={companyInterviews} />
          </Section>
        </div>
      </Section>
    </BasicLayout>
  );
}

// Note: このページでしか使わないコンポーネントは下記に記載しているが、必要があれば共通化しても良い

type SectionProps = {
  headingProps: Pick<HeadingProps, 'label' | 'labelEn' | 'component'>;
  button?: React.ReactNode;
  children: React.ReactNode;
};

function Section({ headingProps, button, children }: SectionProps) {
  return (
    <section>
      <header className="flex items-end justify-between lg:justify-start lg:gap-6">
        <Heading {...headingProps} component="h2" />
        {button}
      </header>
      <article className="mt-6">{children}</article>
    </section>
  );
}

type LinkButtonProps = {
  label?: string;
  href: string;
};

function LinkButton({ href, label = '一覧へ' }: LinkButtonProps) {
  return (
    <Button variant="default" asChild size="sm">
      <Link href={href}>
        {label}
        <ArrowRight size={20} className="ml-1" />
      </Link>
    </Button>
  );
}
