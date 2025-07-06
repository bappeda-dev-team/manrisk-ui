import { AlertNotification } from "../alert/sweetAlert2";

export const setCookies = (name: string, value: any) => {
  let cookiesValue: string;
  cookiesValue = JSON.stringify(value);
  document.cookie = `${name}=${cookiesValue}; path=/`;
}
export const getCookies = (name: string): string | null => {
  if (typeof document === 'undefined') {
    // Jika di server-side, kembalikan null atau nilai default lainnya
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setTahunCookies = (selectedOption: { value: number, label: string }) => {
  setCookies("tahun", selectedOption);
  AlertNotification("Berhasil Mengubah Tahun", `Tahun diubah ke ${selectedOption?.value}`, "success", 2000, true);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
export const setOpdCookies = (selectedOption: { value: string, label: string }) => {
  setCookies("opd", selectedOption);
  AlertNotification("Berhasil Mengubah OPD", `Perangkat Daerah diubah ke ${selectedOption?.label}`, "success", 2000, true);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
export const setNipCookies = (nip: string) => {
  setCookies("nip", nip);
}

type OptionType = {
  label: string;
  value: number;
};
type OptionTypeString = {
  label: string;
  value: string;
}

export const getOpdTahun = (): {
  tahun: OptionType | null;
  opd: OptionTypeString | null;
  nip: string | null;
} => {
  const get_tahun = getCookies("tahun");
  const get_opd = getCookies("opd");
  const get_nip = getCookies("nip");

  return {
    tahun: parseOptionType(get_tahun),
    opd: parseOptionTypeString(get_opd),
    nip: typeof get_nip === "string" ? safeParse(get_nip) : null
  };
};

// Optional: helper untuk handle parse error
function safeParse(value: string): string | null {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}


function parseOptionType(raw: string | null): OptionType | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "label" in parsed &&
      "value" in parsed &&
      typeof parsed.value === "number"
    ) {
      return {
        label: String(parsed.label),
        value: parsed.value
      };
    }
  } catch (_) {}
  return null;
}

function parseOptionTypeString(raw: string | null): OptionTypeString | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "label" in parsed &&
      "value" in parsed &&
      typeof parsed.value === "string"
    ) {
      return {
        label: String(parsed.label),
        value: parsed.value
      };
    }
  } catch (_) {}
  return null;
}
