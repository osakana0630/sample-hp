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
          className={`bg-muted w-full h-[150px] data-[is-home=true]:h-[300px] lg:data-[is-home=true]:h-[500px] flex flex-col justify-center items-center text-center p-4`}
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {pageTitle && typeof pageTitle === "string" ? (
            <h1 className="font-semibold text-xl md:text-2xl  mb-6">
              {pageTitle}
            </h1>
          ) : (
            pageTitle
          )}

          <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap">
            {leadText}
          </p>
        </div>
      )}
      <div className="container max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex flex-col gap-12 py-10">
        {breadcrumb}
        {children}
      </div>
    </>
  );
}
