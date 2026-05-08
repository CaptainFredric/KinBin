"use client";

import { useMemo } from "react";

import { useCareBinders } from "@/store/use-care-binders";

export const useBinder = (binderId: string) => {
  const store = useCareBinders();

  const binder = useMemo(
    () => store.binders.find((item) => item.id === binderId),
    [store.binders, binderId],
  );

  return { ...store, binder };
};
