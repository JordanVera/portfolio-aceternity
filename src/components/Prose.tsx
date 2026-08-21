import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-sm max-w-none prose-p:text-foreground-muted prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent-hover"
      )}
    >
      {children}
    </div>
  );
}
