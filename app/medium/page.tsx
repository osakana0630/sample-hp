import BasicLayout from "@/components/layout/basic-layout";
import { getCategories } from "@/lib/newt";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <BasicLayout pageTitle="メディア">
      <div className="container">
        <h2 className="font-bold text-3xl mb-6 text-center">
          メディアページです
        </h2>
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
    </BasicLayout>
  );
}
