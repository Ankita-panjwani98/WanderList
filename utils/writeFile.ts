import * as FileSystem from "expo-file-system";

export default async function writeFile(fileName: string, data: string) {
  return FileSystem.writeAsStringAsync(fileName, data);
}
