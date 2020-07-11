export function TextCompare(t1, t2) {
  return typeof t1 === "string" && typeof t2 === "string"
    ? t1.localeCompare(t2, undefined, { sensitivity: "accent" }) === 0
    : t1 === t2;
}
