export const splitTime = (timeString: string): string => {
  const times = timeString.slice(2).trim();

  const [, seconds, minutes, hours] = times.split(/H|M|S/gi).reverse();

  return `${hours ? hours + "h" : ""} ${
    minutes ? minutes.padStart(2, "0") + "m" : ""
  } ${seconds ? (Number(seconds) >= 10 ? seconds : "0" + seconds) + "s" : ""}`;
};

export const secondsToNice = (time: number): string => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - hours * 60);
  const seconds = Math.round(time - minutes * 60 - hours * 60 * 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
