class Settings {
  isDarkModeOn: boolean;

  // This value determines if a place is automatically marked
  // as visited based on distance from current location.
  // Set it to zero to disable this feature
  visitedDistanceThreshold: number;

  isFirstLaunch: boolean;

  // meters
  MIN_VISITED_DISTANCE = 100;

  MAX_VISITED_DISTANCE = 10000;

  constructor({
    isDarkModeOn = false,
    visitedDistanceThreshold = 1000,
    isFirstLaunch = true,
  }: {
    isDarkModeOn?: boolean;
    visitedDistanceThreshold?: number;
    isFirstLaunch?: boolean;
  }) {
    this.isDarkModeOn = isDarkModeOn;
    this.visitedDistanceThreshold = visitedDistanceThreshold;
    this.isFirstLaunch = isFirstLaunch;
  }
}

export default Settings;
