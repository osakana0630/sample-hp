import { BasicLayout } from "@/components/layouts/basic-layout";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

export default function Page() {
  return (
    <BasicLayout
      breadcrumb={
        <CustomBreadcrumb links={[{ name: "プライバシーボリシー" }]} />
      }
    >
      <section>
        <h2>プライバシーボリシー</h2>
      </section>
    </BasicLayout>
  );
}
