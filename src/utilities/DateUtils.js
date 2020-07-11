function toUTC(d) {
  if (!d || !d.getFullYear) return 0;
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

function toDays(d) {
  d = d || 0;
  return d / 86400000;
  //24 / 60 / 60 / 1000;
}

function toMonths(m) {
  m = m || 0;
  return m / 2629746000;
}

function toYears(y) {
  y = y || 0;
  return y / 31556952000;
}

export function daysBetween(d1, d2) {
  return Math.round(toDays(toUTC(d2) - toUTC(d1)));
}

export function monthsBetween(d1, d2) {
  return Math.round(toMonths(toUTC(d2) - toUTC(d1)));
}

export function yearsBetween(d1, d2) {
  return Math.round(toYears(toUTC(d2) - toUTC(d1)));
}

export function durationBetween(d1, d2) {
  const totalYears = yearsBetween(d1, d2);
  const totalMonths = monthsBetween(d1, d2);
  const months = totalMonths % 12;
  const totalDays = daysBetween(d1, d2);
  const days = Math.round(totalDays % 30);
  return totalYears === 0
    ? months === 0
      ? days + " days ago!"
      : months + " months and " + days + " days ago!"
    : totalYears + " years " + months + " months and " + days + " days ago!";
}

export function completedDuration(d1, d2) {
  const totalYears = yearsBetween(d1, d2);
  const totalMonths = monthsBetween(d1, d2);
  const months = totalMonths % 12;
  const totalDays = daysBetween(d1, d2);
  const days = Math.round(totalDays % 30);
  return totalYears === 0
    ? months === 0
      ? days + " days!"
      : months + " months and " + days + " days!"
    : totalYears + " years " + months + " months and " + days + " days!";
}
