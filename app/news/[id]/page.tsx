import { getNewsList, getNewsById } from "@/lib/newt";
import BasicLayout from "@/components/layout/basic-layout";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const newsList = await getNewsList();
  return newsList.map((news) => ({
    id: news._id,
  }));
}

export const dynamicParams = false;

// export const runtime = "edge";
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
    <BasicLayout pageTitle="お知らせ">
      <div className="prose container">
        <h1>{news.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: news.body }} />
      </div>
    </BasicLayout>
  );
}
