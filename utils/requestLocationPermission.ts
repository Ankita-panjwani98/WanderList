import * as Location from "expo-location";

export default async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
}
