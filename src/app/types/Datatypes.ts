export type AirQuality = {
  id: number;
  tanggal: string;
  jam: string;
  no2: number;
  so2: number;
  pm25: number;
  co?: number;
  o3?: number;
  hc?: number;
  pm10?: number;
  ws: number;
  wd: number;
  humidity: number;
  temperature: number;
  pressure: number;
  sr: number;
  uv: number;
  rain_intensity: number;
  stat_conn: string;
  feedback: string;
  feedback2: string;
};

export interface Gas {
  id: number;
  waktu: string;

  co: number | null;
  so2: number | null;
  no2: number | null;
  hc: number | null;

  raw_so2: number | null;
  raw_no2: number | null;
  raw_co: number | null;
  raw_hc: number | null;

  ppm_co: number | null;
  ppm_hc: number | null;
  ppm_so2: number | null;
  ppm_no2: number | null;

  temp_co: number | null;
  temp_hc: number | null;
  temp_so2: number | null;
  temp_no2: number | null;
}

export interface O3 {
  id: number;
  waktu: string;

  o3: number | null;
  raw_o3: number | null;
  temp_o3: number | null;
  ppm_o3: number | null;
}

export interface PM {
  id: number;
  waktu: string;

  pm10: number | null;
  pm25: number | null;
  pm1: number | null;
  pm4: number | null;
  status: number | null;
}

export type Location = {
  id: number;
  lat: number;
  long: number;
  updatedAt: string;
  createdAt: string;
};
