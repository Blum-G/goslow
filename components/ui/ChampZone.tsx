"use client";

import {
  forwardRef,
  useState,
  type TextareaHTMLAttributes,
  type ChangeEvent,
} from "react";
import { Champ } from "./Champ";

export interface ChampZoneProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  libelle: string;
  erreur?: string;
  aide?: string;
}

export const ChampZone = forwardRef<HTMLTextAreaElement, ChampZoneProps>(
  function ChampZone(
    {
      id,
      libelle,
      erreur,
      aide,
      value,
      defaultValue,
      onChange,
      required,
      rows = 4,
      className = "",
      ...rest
    },
    ref,
  ) {
    const [valeurInterne, setValeurInterne] = useState(defaultValue ?? "");
    const estControle = value !== undefined;
    const valeurCourante = estControle ? value : valeurInterne;
    const aDuContenu = Boolean(valeurCourante && String(valeurCourante).length > 0);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          required={required}
          aria-invalid={Boolean(erreur)}
          aria-describedby={descriptions || undefined}
          className="mt-3 w-full resize-y bg-transparent text-base font-normal text-[var(--color-anthracite)] outline-none placeholder:opacity-0 focus:outline-none"
          {...rest}
        />
      </Champ>
    );
  },
);
