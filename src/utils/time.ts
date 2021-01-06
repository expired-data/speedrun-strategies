export const splitTime = (timeString: string): string =>
  timeString
    .slice(2)
    .replace(/H|M|S/g, (match: string) => `${match.toLowerCase()} `)
    .trim();
