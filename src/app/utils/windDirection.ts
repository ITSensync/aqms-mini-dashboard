export function generateWindDirection(windData: number) {
  switch (true) {
    case windData >= 0 && windData <= 23:
      return "Utara";
    case windData >= 24 && windData <= 67:
      return "Timur Laut";
    case windData >= 68 && windData <= 115:
      return "Timur";
    case windData >= 116 && windData <= 167:
      return "Tenggara";
    case windData >= 168 && windData <= 205:
      return "Selatan";
    case windData >= 206 && windData <= 248:
      return "Barat Daya";
    case windData >= 249 && windData <= 282:
      return "Barat";
    case windData >= 283 && windData <= 334:
      return "Barat Laut";
    case windData >= 335 && windData <= 360:
      return "Utara";
    default:
      return "-";
  }
}
