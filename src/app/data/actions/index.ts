import { LocationService } from "./LocationService";
import { SensorDataService } from "./SensorDataService";

export const sensorDataService = new SensorDataService(`${process.env.API_URL}/particulate`)
export const locationService = new LocationService(`${process.env.API_URL}/location`)