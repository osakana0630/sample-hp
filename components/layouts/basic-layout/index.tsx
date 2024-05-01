type Props = {
  pageTitle?: string | React.ReactNode;
  leadText?: string;
  bgImageSrc?: string;
  isHome?: boolean;
  breadcrumb?: React.ReactNode;
  children: React.ReactNode;
};
export function BasicLayout({
  pageTitle,
  leadText,
  bgImageSrc,
  breadcrumb,
  children,
  isHome = false,
}: Props) {
  return (
    <>
      {/* TODO: 条件分岐を見直したい */}
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          data-is-home={isHome}
          className={`flex h-[150px] w-full flex-col items-center justify-center bg-muted p-4 text-center data-[is-home=true]:h-[300px] lg:data-[is-home=true]:h-[500px]`}
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        >
          {pageTitle && typeof pageTitle === 'string' ? (
            <h1 className="mb-6 text-xl font-semibold md:text-2xl">{pageTitle}</h1>
          ) : (
            pageTitle
          )}

          <p className="whitespace-pre-wrap text-xs text-muted-foreground md:text-sm">
            {leadText}
          </p>
        </div>
      )}
      <div className="container max-w-screen-sm py-4 md:max-w-screen-md lg:max-w-screen-lg">
        {/* パンくずリスト */}
        {breadcrumb}
        {/* メインコンテンツセクション */}
        <div className="flex flex-col gap-16 py-8 md:gap-20">{children}</div>
      </div>
    </>
  );
}
