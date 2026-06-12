export const mapsSearchUrl = (venueName?: string) => venueName ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}` : undefined;
