"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "./Icon";
import { transitionDouce } from "@/lib/motion";

export type TypeNotification = "succes" | "erreur" | "info";

export interface NotificationItem {
  id: string;
  type: TypeNotification;
  message: string;
  description?: string;
  duree?: number;
}

interface NotificationContextValeur {
  notifier: (item: Omit<NotificationItem, "id">) => void;
  succes: (message: string, description?: string) => void;
  erreur: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  fermer: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValeur | null>(
  null,
);

const icones: Record<TypeNotification, IconName> = {
  succes: "check",
  erreur: "avertissement",
  info: "info",
};

const stylesBordure: Record<TypeNotification, string> = {
  succes: "border-[var(--color-orange)]",
  erreur: "border-red-600",
  info: "border-[var(--color-anthracite)]",
};

const stylesPastille: Record<TypeNotification, string> = {
  succes: "bg-[var(--color-orange)] text-[var(--color-creme)]",
  erreur: "bg-red-600 text-white",
  info: "bg-[var(--color-anthracite)] text-[var(--color-creme)]",
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const fermer = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notifier = useCallback(
    ({
      type,
      message,
      description,
      duree = 4500,
    }: Omit<NotificationItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const nouvelle: NotificationItem = {
        id,
        type,
        message,
        description,
        duree,
      };

      setNotifications((prev) => [...prev, nouvelle]);

      if (duree > 0) {
        setTimeout(() => {
          fermer(id);
        }, duree);
      }
    },
    [fermer],
  );

  const succes = useCallback(
    (message: string, description?: string) => {
      notifier({ type: "succes", message, description });
    },
    [notifier],
  );

  const erreur = useCallback(
    (message: string, description?: string) => {
      notifier({ type: "erreur", message, description });
    },
    [notifier],
  );

  const info = useCallback(
    (message: string, description?: string) => {
      notifier({ type: "info", message, description });
    },
    [notifier],
  );

  return (
    <NotificationContext.Provider
      value={{ notifier, succes, erreur, info, fermer }}
    >
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 z-50 flex flex-col items-center gap-2 px-4"
        style={{
          bottom:
            "calc(1rem + var(--barre-actions-hauteur, 0px) + env(safe-area-inset-bottom, 0px))",
        }}
        aria-live="polite"
      >
        <AnimatePresence>
          {notifications.map((item) => {
            const role = item.type === "erreur" ? "alert" : "status";

            return (
              <motion.div
                key={item.id}
                role={role}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 16, scale: 0.96 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10, scale: 0.96 }
                }
                transition={transitionDouce}
                className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-[var(--radius-petit)] border-2 bg-[var(--color-creme)] p-3.5 text-[var(--color-anthracite)] ${stylesBordure[item.type]}`}
              >
                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full ${stylesPastille[item.type]}`}
                >
                  <Icon name={icones[item.type]} size="sm" />
                </div>

                <div className="flex-1 pt-0.5">
                  <p className="text-sm font-semibold">{item.message}</p>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-neutral-600">
                      {item.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fermer(item.id)}
                  aria-label="Fermer la notification"
                  className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-petit)] text-neutral-500 hover:bg-[var(--color-creme-fonce)] hover:text-[var(--color-anthracite)] focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                >
                  <Icon name="fermer" size="sm" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValeur {
  const contexte = useContext(NotificationContext);
  if (!contexte) {
    throw new Error(
      "useNotification doit être utilisé au sein d'un NotificationProvider",
    );
  }
  return contexte;
}
