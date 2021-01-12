export const splitTime = (timeString: string): string => {
  const times = timeString.slice(2).trim();

  const [, seconds, minutes, hours] = times.split(/H|M|S/gi).reverse();

  return `${hours ? hours + "h" : ""} ${
    minutes ? minutes.padStart(2, "0") + "m" : ""
  } ${seconds ? (Number(seconds) >= 10 ? seconds : "0" + seconds) + "s" : ""}`;
};
