export const IsTimeUpdate = (tanggal: string, waktu: string) => {
  const targetDate = new Date(`${tanggal}T${waktu}`);

  // Ambil waktu sekarang
  const now = new Date();

  // Hitung selisih waktu dalam milidetik
  const diffMs = now.getTime() - targetDate.getTime();

  // Ubah ke menit
  const diffMinutes = diffMs / 1000 / 60;

  if (diffMinutes > 15) {
    return false;
  } else {
    return true;
  }
};
