import { LocationGeocodedLocation } from "expo-location";

// Sources
// https://en.wikipedia.org/wiki/Haversine_formula
// https://stackoverflow.com/questions/70604402/how-to-calculate-the-distance-between-differents-lat-long-and-display-on-map-dyn

const EARTH_RADIUS = 6371; // in km

const toRad = (deg: number) => deg * (Math.PI / 180);

export default function getDistanceBetweenPoints(
  origin: LocationGeocodedLocation,
  destination: LocationGeocodedLocation
) {
  const { latitude: lat1, longitude: lon1 } = origin;
  const { latitude: lat2, longitude: lon2 } = destination;

  const dlat = toRad(lat2 - lat1);
  const dlon = toRad(lon2 - lon1);

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}
