'use client'

import { createContext, useContext } from "react"

interface ApiUrlContextType {
  url_perencanaan: string | undefined;
  url_manrisk: string | undefined;
  token?: string | undefined;
}

const API_PERENCANAAN = process.env.NEXT_PUBLIC_API_PERENCANAAN;
const API_MANRISK = process.env.NEXT_PUBLIC_API_MANRISK;

// gunakan saat development saja
const TOKEN = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN

// context
const ApiUrlContext = createContext<ApiUrlContextType | undefined>(undefined);

export function ApiUrlProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
  const rawCsrfToken = typeof document !== 'undefined'
    ? document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1]
    : undefined;

  return (
    <ApiUrlContext.Provider value={{ url_perencanaan: API_PERENCANAAN, url_manrisk: API_MANRISK, token: TOKEN, }}>
      {children}
    </ApiUrlContext.Provider>
  );
}

export function useApiUrlContext() {
  const context = useContext(ApiUrlContext);
  if (context === undefined) {
    throw new Error("useApiUrlContext must be used witihin a ApiUrlProvider")
  }
  return context;
}
