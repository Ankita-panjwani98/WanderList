class Settings {
  isDarkModeOn: boolean;

  // This value determines if a place is automatically marked
  // as visited based on distance from current location.
  // Set it to zero to disable this feature
  visitedDistanceThreshold: number;

  constructor({
    isDarkModeOn = false,
    visitedDistanceThreshold = 1,
  }: {
    isDarkModeOn?: boolean;
    visitedDistanceThreshold?: number;
  }) {
    this.isDarkModeOn = isDarkModeOn;
    this.visitedDistanceThreshold = visitedDistanceThreshold;
  }
}

export default Settings;
