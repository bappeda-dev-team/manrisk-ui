'use client'

import { createContext, useContext } from "react"

interface BrandingContextType {
  title: string;
  logo: string;
  url_dashboard: string;
  api_perencanaan: string;
  api_manrisk: string;
  branding: {
    title: string;
    logo: string;
    url_dashboard: string;
    api_perencanaan: string;
    api_manrisk: string;
  }
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "";
const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
const url_dashboard = process.env.NEXT_PUBLIC_DASHBOARD_URL || "";
const api_perencanaan = process.env.NEXT_PUBLIC_API_PERENCANAAN || "";
const api_manrisk = process.env.NEXT_PUBLIC_API_MANRISK || "";

// context
const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <BrandingContext.Provider 
      value={{ 
        title: appName, 
        logo: logo, 
        url_dashboard: url_dashboard,
        api_perencanaan: api_perencanaan,
        api_manrisk: api_manrisk,
        branding: { 
          title: appName, 
          logo: logo, 
          url_dashboard: url_dashboard,
          api_perencanaan: api_perencanaan,
          api_manrisk: api_manrisk,
        } 
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

export function useBrandingContext() {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error("useBrandingContext must be used witihin a BrandingProvider")
  }
  return context;
}
