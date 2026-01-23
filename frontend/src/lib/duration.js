export function formatTradeDuration(entryTime, exitTime) {
  if (!entryTime || !exitTime) return "—";

  const start = new Date(entryTime);
  const end = new Date(exitTime);

  if (isNaN(start) || isNaN(end)) return "—";

  const durationMs = end - start;

  if (durationMs <= 0) return "0 min";

  const totalMinutes = Math.floor(durationMs / 60000);

  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}, ${hours} hr${hours !== 1 ? "s" : ""}, ${minutes} min`;
  }

  if (totalHours > 0) {
    return `${totalHours} hr${totalHours !== 1 ? "s" : ""}, ${minutes} min`;
  }

  return `${minutes} min`;
}
