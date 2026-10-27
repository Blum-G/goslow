"use client";

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";
import Link from "next/link";

export type VarianteBouton = "primaire" | "secondaire" | "discret";
export type TailleBouton = "md" | "lg";

interface BaseBoutonProps {
  children: ReactNode;
  variante?: VarianteBouton;
  taille?: TailleBouton;
  chargement?: boolean;
  magnetique?: boolean;
  className?: string;
}

export type BoutonProps = BaseBoutonProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string; externe?: boolean } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
      >)
  );

export const Button = forwardRef<HTMLElement, BoutonProps>(function Button(
  props,
  ref,
) {
  const {
    children,
    variante = "primaire",
    taille = "md",
    chargement = false,
    magnetique = false,
    className = "",
    ...rest
  } = props;

  const elementRef = useRef<HTMLElement | null>(null);
  const [positionMagnetique, setPositionMagnetique] = useState({ x: 0, y: 0 });
  const [supportPointeurFin, setSupportPointeurFin] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const match = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionReduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSupportPointeurFin(match.matches && !motionReduit.matches);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetique || !supportPointeurFin || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centreX) * 0.18;
    const deltaY = (e.clientY - centreY) * 0.18;
    setPositionMagnetique({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    if (magnetique && supportPointeurFin) {
      setPositionMagnetique({ x: 0, y: 0 });
    }
  };

  const taillesClasses: Record<TailleBouton, string> = {
    md: "min-h-[44px] px-5 py-2.5 text-[0.9375rem] rounded-[var(--radius-petit)] gap-2",
    lg: "min-h-[52px] px-7 py-3.5 text-base md:text-[1.0625rem] rounded-[var(--radius-petit)] gap-2.5",
  };

  const styleMagnetique =
    magnetique && supportPointeurFin
      ? {
          transform: `translate3d(${positionMagnetique.x}px, ${positionMagnetique.y}px, 0)`,
          transition:
            positionMagnetique.x === 0 && positionMagnetique.y === 0
              ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
        }
      : undefined;

  const spinner = (
    <svg
      className="h-4 w-4 animate-spin text-current"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (variante === "discret") {
    const classesDiscret = `group relative inline-flex items-center justify-center font-medium text-[var(--color-anthracite)] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 hover:text-[var(--color-orange)] disabled:opacity-50 disabled:pointer-events-none ${taillesClasses[taille]} ${className}`;

    const contenuDiscret = (
      <span className="relative inline-flex items-center gap-2">
        {chargement && spinner}
        <span>{children}</span>
        <span
          className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--color-orange)] transition-transform duration-300 ease-[var(--ease-smooth)] group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
          aria-hidden="true"
        />
      </span>
    );

    if ("href" in props && props.href) {
      const { href, externe, ...lienProps } = rest as {
        href: string;
        externe?: boolean;
      };
      const estExterne =
        externe || href.startsWith("http") || href.startsWith("//");

      return (
        <a
          ref={(node) => {
            elementRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          href={href}
          className={classesDiscret}
          style={styleMagnetique}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...(estExterne
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...lienProps}
        >
          {contenuDiscret}
        </a>
      );
    }

    const { disabled, ...boutonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type={boutonProps.type || "button"}
        disabled={disabled || chargement}
        aria-busy={chargement}
        className={classesDiscret}
        style={styleMagnetique}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...boutonProps}
      >
        {contenuDiscret}
      </button>
    );
  }

  const estPrimaire = variante === "primaire";
  const stylesConteneur = estPrimaire
    ? "bg-[var(--color-orange)] text-[var(--color-creme)] border border-transparent shadow-none"
    : "bg-transparent text-[var(--color-anthracite)] border border-[var(--color-anthracite)]";

  const stylesRemplissage = estPrimaire
    ? "bg-[var(--color-anthracite)]"
    : "bg-[var(--color-anthracite)]";

  const stylesTexte = estPrimaire
    ? "text-[var(--color-creme)]"
    : "text-[var(--color-anthracite)] group-hover:text-[var(--color-creme)] group-active:text-[var(--color-creme)]";

  const classesBase = `group relative isolate inline-flex items-center justify-center overflow-hidden font-medium outline-none transition-[box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none ${stylesConteneur} ${taillesClasses[taille]} ${className}`;

  const contenuBouton = (
    <>
      <span
        className={`absolute inset-0 translate-y-full transition-transform duration-300 ease-[var(--ease-smooth)] group-hover:translate-y-0 group-active:translate-y-0 -z-10 ${stylesRemplissage}`}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-200 ${stylesTexte}`}
      >
        {chargement && spinner}
        <span>{children}</span>
      </span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, externe, ...lienProps } = rest as {
      href: string;
      externe?: boolean;
    };
    const estExterne =
      externe || href.startsWith("http") || href.startsWith("//");

    if (estExterne) {
      return (
        <a
          ref={(node) => {
            elementRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          href={href}
          className={classesBase}
          style={styleMagnetique}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          target="_blank"
          rel="noopener noreferrer"
          {...lienProps}
        >
          {contenuBouton}
        </a>
      );
    }

    return (
      <Link
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        href={href}
        className={classesBase}
        style={styleMagnetique}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...lienProps}
      >
        {contenuBouton}
      </Link>
    );
  }

  const { disabled, ...boutonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      type={boutonProps.type || "button"}
      disabled={disabled || chargement}
      aria-busy={chargement}
      className={classesBase}
      style={styleMagnetique}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...boutonProps}
    >
      {contenuBouton}
    </button>
  );
});
