import { RightSection } from "@/components/layouts/media-layout/right-section";

type Props = {
  pageTitle?: string | React.ReactNode;
  leadText?: string;
  bgImageSrc?: string;
  children: React.ReactNode;
};

export function MediaLayout({
  pageTitle,
  leadText,
  bgImageSrc,
  children,
}: Props) {
  return (
    <>
      {(pageTitle || leadText || bgImageSrc) && (
        <div
          className={`bg-muted w-full h-[150px] flex flex-col justify-center items-center text-center p-4`}
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

      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-4">
        {/* メインセクション */}
        <div className="py-8 w-full lg:w-[70%]">{children}</div>

        {/* 右側のセクション */}
        <div className="flex flex-col py-8 w-full lg:w-[30%] gap-6">
          <RightSection />
        </div>
      </div>
    </>
  );
}
