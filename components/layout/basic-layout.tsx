type Props = {
  pageTitle?: string;
  leadText?: string;
  children: React.ReactNode;
};
export default function BasicLayout({ children, pageTitle, leadText }: Props) {
  return (
    <div>
      {(pageTitle || leadText) && (
        <div className="bg-muted w-full h-72 flex flex-col justify-center items-center text-center">
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
