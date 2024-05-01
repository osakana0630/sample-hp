import { RightSection } from '@/components/layouts/media-layout/right-section';

type Props = {
  pageTitle?: string | React.ReactNode;
  leadText?: string;
  bgImageSrc?: string;
  breadcrumb?: React.ReactNode;
  children: React.ReactNode;
};

export function MediaLayout({
  pageTitle,
  leadText,
  bgImageSrc,
  breadcrumb,
  children,
}: Props) {
  return (
    <>
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          className={`flex h-[150px] w-full flex-col items-center justify-center bg-muted p-4 text-center`}
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        >
          {pageTitle && typeof pageTitle === 'string' ? (
            <h1 className="font-semiboald mb-6 text-xl  md:text-2xl">{pageTitle}</h1>
          ) : (
            pageTitle
          )}

          <p className="whitespace-pre-wrap text-xs text-muted-foreground md:text-sm">
            {leadText}
          </p>
        </div>
      )}

      <div className="container max-w-screen-sm py-4 md:max-w-screen-md  lg:max-w-screen-lg">
        {breadcrumb}
        <div className="mx-auto flex flex-col gap-6 lg:flex-row lg:justify-between">
          {/* メインセクション */}
          <div className="w-full py-8 lg:w-[70%]">{children}</div>

          {/* 右側のセクション */}
          <div className="flex w-full flex-col gap-6 py-8 lg:w-[30%]">
            <RightSection />
          </div>
        </div>
      </div>
    </>
  );
}
