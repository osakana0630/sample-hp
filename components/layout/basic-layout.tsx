type Props = {
  pageTitle?: string;
  leadText?: string;
  bgImageSrc?: string;
  children: React.ReactNode;
};
export default function BasicLayout({
  children,
  pageTitle,
  leadText,
  bgImageSrc,
}: Props) {
  return (
    <>
      {/* TODO: 条件分岐を見直したい */}
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          className={`bg-muted w-full h-[200px] md:h-[300px] lg:h-[500px] flex flex-col justify-center items-center text-center`}
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
