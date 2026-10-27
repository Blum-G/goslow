"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ChangeEvent,
} from "react";
import { Champ } from "./Champ";

export interface ChampTexteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  libelle: string;
  erreur?: string;
  aide?: string;
  type?: "text" | "tel" | "email" | "number" | "search";
}

export const ChampTexte = forwardRef<HTMLInputElement, ChampTexteProps>(
  function ChampTexte(
    {
      id,
      libelle,
      erreur,
      aide,
      type = "text",
      value,
      defaultValue,
      onChange,
      required,
      className = "",
      ...rest
    },
    ref,
  ) {
    const [valeurInterne, setValeurInterne] = useState(defaultValue ?? "");
    const estControle = value !== undefined;
    const valeurCourante = estControle ? value : valeurInterne;
    const aDuContenu = Boolean(valeurCourante && String(valeurCourante).length > 0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!estControle) {
        setValeurInterne(e.target.value);
      }
      onChange?.(e);
    };

    const idErreur = `${id}-erreur`;
    const idAide = `${id}-aide`;
    const descriptions = [erreur ? idErreur : null, aide ? idAide : null]
      .filter(Boolean)
      .join(" ");

    return (
      <Champ
        id={id}
        libelle={libelle}
        actif={aDuContenu}
        erreur={erreur}
        aide={aide}
        requis={required}
        className={className}
      >
        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          required={required}
          aria-invalid={Boolean(erreur)}
          aria-describedby={descriptions || undefined}
          className="w-full bg-transparent text-base font-normal text-[var(--color-anthracite)] outline-none placeholder:opacity-0 focus:outline-none"
          {...rest}
        />
      </Champ>
    );
  },
);
