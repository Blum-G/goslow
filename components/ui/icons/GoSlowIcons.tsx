import type { SVGProps } from "react";

type SvgIconProps = SVGProps<SVGSVGElement>;

export function IconBol(props: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M32 112h192" />
      <path d="M40 112c8 64 48 96 88 96s80-32 88-96" />
      <path d="M96 208h64" />
      <path d="M96 80c-4-12 4-20 4-28" />
      <path d="M128 84c-4-14 4-22 4-32" />
      <path d="M160 80c-4-12 4-20 4-28" />
    </svg>
  );
}

export function IconCouverts(props: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M72 40v44c0 14 10 24 24 24s24-10 24-24V40" />
      <path d="M96 40v44" />
      <path d="M96 108v108" />
      <path d="M160 40c-18 0-28 20-28 44s10 44 28 44 28-20 28-44-10-44-28-44Z" />
      <path d="M160 128v88" />
    </svg>
  );
}

export function IconLivraison(props: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="68" cy="192" r="28" />
      <circle cx="188" cy="192" r="28" />
      <path d="M36 84h56v56H36z" />
      <path d="M68 192h52l24-48h36" />
      <path d="M188 192l-20-80h24" />
      <path d="M100 132h28" />
    </svg>
  );
}

export function IconHorloge(props: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="128" cy="128" r="96" />
      <path d="M128 76v52l36 20" />
    </svg>
  );
}

export function IconRepere(props: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M128 228s-72-68-72-124a72 72 0 1 1 144 0c0 56-72 124-72 124Z" />
      <circle cx="128" cy="104" r="24" />
    </svg>
  );
}
