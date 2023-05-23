import * as FileSystem from "expo-file-system";
import BucketList from "./BucketList";
import Settings from "./Settings";

const DATA_FILE = `${FileSystem.documentDirectory}WanderList.json`;

class DB {
  bucketList = new BucketList([]);

  settings = new Settings();

  constructor() {
    FileSystem.getInfoAsync(DATA_FILE)
      .then(({ exists }) => {
        if (exists) {
          FileSystem.readAsStringAsync(DATA_FILE).then((rawJson) => {
            const { bucketList, settings } = JSON.parse(rawJson);
            this.bucketList = bucketList as BucketList;
            this.settings = settings as Settings;
          });
        }
      })
      .catch(console.error);
  }

  async sync() {
    try {
      await FileSystem.writeAsStringAsync(
        DATA_FILE,
        JSON.stringify({ bucketList: this.bucketList, settings: this.settings })
      );
    } catch (error) {
      console.error("Error while trying to save data: ", error);
    }
  }
}

export default new DB();
