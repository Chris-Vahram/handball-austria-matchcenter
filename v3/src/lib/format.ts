const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const formatDay = (iso: string) =>
  new Intl.DateTimeFormat("de-AT", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(at(iso));

export const formatShortDate = (iso: string) =>
  new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(at(iso));

export const formatStand = (isoDateTime: string) =>
  new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Vienna" }).format(new Date(isoDateTime));

/** Typographic minus for negative numbers, explicit plus for positive goal difference. */
export const formatDiff = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0");
