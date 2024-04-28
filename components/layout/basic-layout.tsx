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
    <div>
      {/* TODO: 条件分岐を見直したい */}
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          className={`bg-muted w-full h-72 flex flex-col justify-center items-center text-center`}
          style={{ backgroundImage: `url(${bgImageSrc})` }}
        >
          <h1 className="font-semibold text-3xl mb-6">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {leadText}
          </p>
        </div>
      )}
      <div className="py-10">{children}</div>
    </div>
  );
}
