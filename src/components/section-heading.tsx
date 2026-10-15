import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-kicker"><span>{index}</span><span className="kicker-line" /><span>{eyebrow}</span></div>
      <div className="section-heading-main">
        <h2>{title}</h2>
        {children ? <div className="section-heading-copy">{children}</div> : null}
      </div>
    </div>
  );
}
