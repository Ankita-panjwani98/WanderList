import * as Location from "expo-location";
import requestLocationPermission from "./requestLocationPermission";

export default async function getCurrentPositionAsync() {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;
  return Location.getCurrentPositionAsync({
    accuracy: Location.LocationAccuracy.Low,
  });
}
