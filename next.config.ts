import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    AQMS_SITE: process.env.AQMS_SITE,
    AQMS_TYPE: process.env.AQMS_TYPE,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
  }
};

export default nextConfig;
