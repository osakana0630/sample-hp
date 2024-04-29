import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import BasicLayout from "@/components/layout/basic-layout";
import { Heading } from "@/components/heading";

export default async function Page() {
  return (
    <BasicLayout
      pageTitle={
        <Heading component="h1" label="お問い合わせ" labelEn="Contact Us" />
      }
    >
      <div className="container max-w-2xl">
        <form
          method="post"
          action="https://imai.form.newt.so/v1/b1WwN1BIan"
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="fullName">氏名*</Label>
            <Input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="山田太郎"
              required
            />
          </div>

          <div>
            <Label htmlFor="companyName">会社名*</Label>
            <Input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="株式会社〇〇"
              required
            />
          </div>

          <div>
            <Label htmlFor="department">部署</Label>
            <Input
              id="department"
              type="text"
              name="department"
              placeholder="営業部"
            />
          </div>

          <div>
            <Label htmlFor="tel">電話番号*</Label>
            <Input
              id="tel"
              type="tel"
              name="tel"
              placeholder="09012345678"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">メールアドレス*</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="yamadai@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="content">お問い合わせ内容*</Label>
            <Textarea id="content" name="content" rows={8} required />
          </div>

          <Button variant="secondary" type="submit">
            送信
          </Button>
        </form>
      </div>
    </BasicLayout>
  );
}
