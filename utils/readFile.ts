import * as FileSystem from "expo-file-system";

export default async function readFile(fileName: string) {
  const { exists } = await FileSystem.getInfoAsync(fileName);
  if (!exists) return null;
  const raw = await FileSystem.readAsStringAsync(fileName);
  return JSON.parse(raw);
}
