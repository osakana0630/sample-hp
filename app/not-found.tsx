import Link from 'next/link';
import { paths } from '@/routes';
import { config } from '@/config';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-screen-2xl py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col items-center">
        <Link
          href={paths.home}
          className="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
          aria-label="ロゴ"
        >
          {config.companyName}
        </Link>

        <p className="mb-4 text-sm font-semibold uppercase text-primary md:text-base">
          404 page
        </p>
        <h1 className="mb-2 text-center text-2xl font-bold text-muted-foreground md:text-3xl">
          ページが見つかりません
        </h1>

        <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
          ページが移動または削除された可能性があります。
          <br />
          お手数ですが、以下のリンクからホームに戻ってください。
        </p>

        <Button variant="default" asChild>
          <Link href={paths.home}>ホームへ</Link>
        </Button>
      </div>
    </div>
  );
}
