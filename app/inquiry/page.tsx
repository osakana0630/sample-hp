import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BasicLayout from "@/components/layout/basic-layout";

export default async function Page() {
  return (
    <BasicLayout pageTitle="お問い合わせ">
      <div className="container">
        <h2 className="font-bold text-3xl mb-6 text-center">
          お問い合わせフォーム
        </h2>
        <form
          method="post"
          action="https://imai.form.newt.so/v1/b1WwN1BIan"
          className="flex flex-col gap-4"
        >
          <label htmlFor="fullName">
            氏名
            <Input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="山田太郎"
            />
          </label>
          <label htmlFor="companyName">
            会社名
            <Input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="株式会社〇〇"
            />
          </label>
          <label htmlFor="department">
            部署
            <Input
              id="department"
              type="text"
              name="department"
              placeholder="営業部"
            />
          </label>
          <label htmlFor="tel">
            電話番号
            <Input id="tel" type="tel" name="tel" placeholder="09012345678" />
          </label>
          <label htmlFor="email">
            メールアドレス
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="yamadai@example.com"
            />
          </label>
          <label htmlFor="tel">
            電話番号
            <Input id="tel" type="tel" name="tel" placeholder="09012345678" />
          </label>
          <Button variant="secondary" type="submit">
            送信
          </Button>
        </form>
      </div>
    </BasicLayout>
  );
}
