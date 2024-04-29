import BasicLayout from "@/components/layout/basic-layout";
import { Heading } from "@/components/heading";

export default async function Page() {
  return (
    <BasicLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
    >
      <div className="container">
        <h2 className="font-bold text-3xl mb-6 text-center">
          メディアページです
        </h2>
      </div>
    </BasicLayout>
  );
}
