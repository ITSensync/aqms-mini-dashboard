export function formatNumber(num: number) {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
}

export function splitDateTime(isoString: string) {
  // Hilangkan Z dan .000
  const clean = isoString.replace("Z", "").replace(".000", "");

  // Pisah tanggal & waktu
  const [date, time] = clean.split("T");

  return {
    tanggal: date,
    jam: time,
  };
}

