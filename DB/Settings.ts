class Settings {
  isDarkModeOn: boolean;

  // This value determines if a place is automatically marked
  // as visited based on distance from current location.
  // Set it to zero to disable this feature
  visitedDistanceThreshold: number;

  // meters
  MIN_VISITED_DISTANCE = 100;

  MAX_VISITED_DISTANCE = 10000;

  constructor({
    isDarkModeOn = false,
    visitedDistanceThreshold = 1000,
  }: {
    isDarkModeOn?: boolean;
    visitedDistanceThreshold?: number;
  }) {
    this.isDarkModeOn = isDarkModeOn;
    this.visitedDistanceThreshold = visitedDistanceThreshold;
  }
}

export default Settings;
