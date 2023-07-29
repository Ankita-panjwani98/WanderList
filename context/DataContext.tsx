import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { documentDirectory } from "expo-file-system";

import BucketList from "../DB/BucketList";
import Settings from "../DB/Settings";
import readFile from "../utils/readFile";
import writeFile from "../utils/writeFile";
import TagsList from "../DB/TagsList";

const DATA_FILE = `${documentDirectory}WanderList.json`;

export interface DataContext {
  bucketList: BucketList;
  settings: Settings;
  userTags: TagsList;
  setBucketList: (bucketList: BucketList) => void;
  setSettings: (settings: Settings) => void;
  setUserTags: (newTags: TagsList) => void;
  isFileRead: boolean;
}

const ctx = createContext<DataContext | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [bucketList, _setBucketList] = useState<BucketList>(new BucketList([]));
  const [settings, _setSettings] = useState<Settings>(new Settings({}));
  const [isFileRead, _setFileRead] = useState(false);
  const [userTags, _setUserTags] = useState<TagsList>(new TagsList([]));

  useEffect(() => {
    readFile(DATA_FILE)
      .then((data) => {
        if (data) {
          const { bucketList: b, settings: s, userTags: ut } = data;
          _setBucketList(b);
          _setSettings(s);
          _setUserTags(ut || new TagsList([]));
        }
        _setFileRead(true);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const syncDataToFile = useCallback(
    ({
      newBucketList,
      newSettings,
      newTags,
    }: {
      newBucketList?: BucketList;
      newSettings?: Settings;
      newTags?: TagsList;
    }) => {
      const data = JSON.stringify({
        // Use old value if no new supplied
        bucketList: newBucketList || bucketList,
        settings: newSettings || settings,
        userTags: newTags || userTags,
      });

      writeFile(DATA_FILE, data).catch((err) => {
        throw new Error(err);
      });
    },
    [bucketList, settings, userTags]
  );

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

  const setUserTags = useCallback(
    (newTags: TagsList) => {
      _setUserTags(newTags);
      syncDataToFile({ newTags });
    },
    [syncDataToFile]
  );

  const value = useMemo(
    () => ({
      bucketList,
      setBucketList,
      settings,
      setSettings,
      userTags,
      setUserTags,
      isFileRead,
    }),
    [
      bucketList,
      setBucketList,
      settings,
      setSettings,
      userTags,
      setUserTags,
      isFileRead,
    ]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}

export default function useDataContext() {
  const c = useContext<DataContext | null>(ctx);

  if (
    !c ||
    !c.bucketList ||
    !c.settings ||
    !c.userTags ||
    !c.setBucketList ||
    !c.setSettings ||
    !c.setUserTags
  )
    throw new Error("Error while accessing bucket list context");

  return c;
}
