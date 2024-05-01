import { BasicLayout } from "@/components/layouts/basic-layout";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Heading } from "@/components/heading";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

export default function Page() {
  return (
    <BasicLayout
      pageTitle={
        <Heading
          component="h1"
          label="会社情報"
          labelEn="Company Information"
        />
      }
      breadcrumb={<CustomBreadcrumb links={[{ name: "会社情報" }]} />}
    >
      <div className="flex flex-col gap-12">
        {/* 代表挨拶 */}
        <section>
          <h2 className="font-semibold text-2xl mb-6 text-center">代表挨拶</h2>
          <div className="py-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="aspect-square overflow-hidden border rounded-lg bg-muted relative">
                <Image
                  src={"/images/ceo.png"}
                  alt={"ceo"}
                  fill
                  className="object-fit object-center"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-3">
                  全ての人/組織の可能性を最大化させる。
                </h3>
                <p className="text-sm text-muted-foreground leading-8">
                  皆様、こんにちは。この度は当社のウェブサイトにお越しいただき、誠にありがとうございます。
                  私たちは、〇〇業界におけるリーディングカンパニーとして、革新的な製品と優れたサービスを提供することで社会に貢献しています。
                  当社は設立以来、持続可能な発展を目指し、常にお客様との信頼関係を大切にして参りました。
                  また、地域社会との協働も積極的に行い、より良い未来の実現に努めています。
                  これからも、技術革新を追求し、さらなる価値創造を進めてまいります。
                  皆様の期待に応えるべく、従業員一同、一層の努力を重ねて参りますので、変わらぬご支援とご鞭撻を賜りますようお願い申し上げます。
                </p>
                <p className="text-sm text-muted-foreground text-right">
                  本田圭佑
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 会社情報 */}
        <section>
          <h2 className="font-semibold text-2xl mb-6 text-center">会社情報</h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">会社名</TableCell>
                <TableCell>株式会社〇〇</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">所在地</TableCell>
                <TableCell>東京都港区〇〇丁目〇〇番地〇〇ビル6F</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">代表取締役</TableCell>
                <TableCell>本田圭佑</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">設立年月日</TableCell>
                <TableCell>2013年5月</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">事業内容</TableCell>
                <TableCell>営業代行・人材紹介</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </BasicLayout>
  );
}
