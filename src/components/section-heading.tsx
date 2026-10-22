import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-header-inexa mb-10 sm:mb-12">
      <div className="eyebrow-wrap flex items-center gap-2.5 mb-3">
        <span className="badge-inexa">{eyebrow}</span>
        {index ? (
          <span className="text-xs font-mono font-medium text-[var(--text-muted)] tracking-wider">
            /{index}
          </span>
        ) : null}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-3 leading-tight">
        {title}
      </h2>
      {children ? (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed m-0">
          {children}
        </p>
      ) : null}
    </div>
  );
}
