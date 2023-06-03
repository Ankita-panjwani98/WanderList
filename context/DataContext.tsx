import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as FileSystem from "expo-file-system";

import BucketList from "../DB/BucketList";
import Settings from "../DB/Settings";

const DATA_FILE = `${FileSystem.documentDirectory}WanderList.json`;

export interface DataContext {
  bucketList: BucketList;
  settings: Settings;
  setBucketList: (bucketList: BucketList) => void;
  setSettings: (settings: Settings) => void;
  resetData: () => void;
}

const ctx = createContext<DataContext | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [bucketList, _setBucketList] = useState<BucketList>(new BucketList([]));
  const [settings, _setSettings] = useState<Settings>(new Settings());

  useEffect(() => {
    FileSystem.getInfoAsync(DATA_FILE)
      .then(({ exists }) => {
        if (exists) {
          FileSystem.readAsStringAsync(DATA_FILE).then((rawJson) => {
            const { bucketList: b, settings: s } = JSON.parse(rawJson);
            _setBucketList(b);
            _setSettings(s);
          });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const syncDataToFile = useCallback(
    ({
      newBucketList,
      newSettings,
    }: {
      newBucketList?: BucketList;
      newSettings?: Settings;
    }) => {
      FileSystem.writeAsStringAsync(
        DATA_FILE,
        JSON.stringify({
          bucketList: newBucketList || bucketList, // Use old value if no new supplied
          settings: newSettings || settings,
        })
      ).catch((err) => {
        throw new Error(err);
      });
    },
    [bucketList, settings]
  );

  const resetData = useCallback(() => {
    const newBucketList = new BucketList([]);
    const newSettings = new Settings();
    _setBucketList(newBucketList);
    _setSettings(newSettings);
    syncDataToFile({ newBucketList, newSettings });
  }, [syncDataToFile]);

  const setBucketList = useCallback(
    (newBucketList: BucketList) => {
      _setBucketList(newBucketList);
      syncDataToFile({ newBucketList });
    },
    [syncDataToFile]
  );

  const setSettings = useCallback(
    (newSettings: Settings) => {
      _setSettings(newSettings);
      syncDataToFile({ newSettings });
    },
    [syncDataToFile]
  );

  const value = useMemo(
    () => ({
      bucketList,
      setBucketList,
      settings,
      setSettings,
      resetData,
    }),
    [bucketList, setBucketList, settings, setSettings, resetData]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext<DataContext | null>(ctx);

  if (
    !c ||
    !c.bucketList ||
    !c.settings ||
    !c.setBucketList ||
    !c.setSettings ||
    !c.resetData
  )
    throw new Error("Error while accessing bucket list context");

  return c;
}
