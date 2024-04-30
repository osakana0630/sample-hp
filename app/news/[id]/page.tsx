import { getNewsList, getNewsById } from "@/lib/newt";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { notFound } from "next/navigation";
import { Heading } from "@/components/heading";

export async function generateStaticParams() {
  const { news } = await getNewsList();
  return news.map((newsItem) => ({
    id: newsItem._id,
  }));
}

export const dynamicParams = false;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <BasicLayout
      pageTitle={<Heading component="h1" label="お知らせ" labelEn="News" />}
    >
      <div className="prose container">
        <h1>{news.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: news.body }} />
      </div>
    </BasicLayout>
  );
}
