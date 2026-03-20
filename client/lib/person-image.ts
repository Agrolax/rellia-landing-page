/** Public asset path: `public/images/{Firstname}.png` from a display name. */
export function personImageByFirstName(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  let idx = 0;
  if (parts.length >= 2 && /^(dr|mr|mrs|ms|prof)\.?$/i.test(parts[0] ?? "")) {
    idx = 1;
  }
  const raw = parts[idx] ?? "avatar";
  const first =
    raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase().replace(/[^a-zA-Z]/g, "");
  return `/images/${first || "Avatar"}.png`;
}
