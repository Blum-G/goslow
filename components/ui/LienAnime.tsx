import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface LienAnimeProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
  externe?: boolean;
}

export function LienAnime({
  href,
  children,
  className = "",
  externe = false,
  ...rest
}: LienAnimeProps) {
  const estExterne = externe || href.startsWith("http") || href.startsWith("//");
  const propsLien = estExterne
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const contenu = (
    <span className="relative inline-flex items-center">
      {children}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--color-orange)] transition-transform duration-300 ease-[var(--ease-smooth)] group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
        aria-hidden="true"
      />
    </span>
  );

  const classesBase = `group inline-flex min-h-[44px] items-center text-current font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 rounded-[var(--radius-petit)] ${className}`;

  if (estExterne) {
    return (
      <a href={href} className={classesBase} {...propsLien} {...rest}>
        {contenu}
      </a>
    );
  }

  return (
    <Link href={href} className={classesBase} {...rest}>
      {contenu}
    </Link>
  );
}
