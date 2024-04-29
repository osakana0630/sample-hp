import BasicLayout from "@/components/layout/basic-layout";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <BasicLayout pageTitle="会社情報">
      <div className="container flex flex-col gap-12">
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
                  人/組織は必ずしも可能性を最大限に引き出せているというわけでははないと思います。
                  現状への満足、成功への道筋が見えない、過去の失敗体験など色々な理由はあります。
                  私自身、大企業からベンチャー企業への転職を経て、今まで引き出せていなかった「可能性」を最大限に引き上げることができました。反対に成果が出せず挑戦することを諦めてしまう人も見てきました。
                  挑戦を後押ししたい、人それぞれにあった挑戦の場を提供したい、ゴールまでの道を指し示したい。
                  そんな想いで「道標」という社名で会社を立ち上げました。
                  現在は人材ビジネス、営業支援ビジネスを起点に進めておりますが、目的達成のために、複数事業の展開も考えております。
                  挑戦することの楽しさや、やる理由/できる理由を見つける、無理な目標設定をせず、必ず目標達成をする。
                  この想いを社内はもちろん、相対する方全ての人に伝えたいと考えています。
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
