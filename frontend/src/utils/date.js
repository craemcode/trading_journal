export const formatDate = (
  dateString,
  options = { withTime: false }
) => {
  const date = new Date(dateString);

  const year = date.getFullYear();

  const weekday = date.toLocaleDateString("en-GB", {
    weekday: "short",
  });

  const dayMonth = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "numeric",
  });

  if (options.withTime) {
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

   //return `${year} ${weekday} ${dayMonth} · ${time}`;
   return `${time}-${dayMonth}/${year}`;
  }

  return `${year} ${weekday} ${dayMonth}`;
};