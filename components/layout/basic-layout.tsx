type Props = {
  pageTitle?: string;
  leadText?: string;
  bgImageSrc?: string;
  isHome?: boolean;
  children: React.ReactNode;
};
export default function BasicLayout({
  pageTitle,
  leadText,
  bgImageSrc,
  isHome = false,
  children,
}: Props) {
  return (
    <>
      {/* TODO: 条件分岐を見直したい */}
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          data-is-home={isHome}
          className={`bg-muted w-full h-[300px] lg:data-[is-home=true]:h-[500px] flex flex-col justify-center items-center text-center`}
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <h1 className="font-semibold text-3xl mb-6">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {leadText}
          </p>
        </div>
      )}
      <div className="py-10">{children}</div>
    </>
  );
}
