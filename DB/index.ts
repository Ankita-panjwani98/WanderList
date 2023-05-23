import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("WanderList.db");

// Why each PRAGMA is set?
// https://cj.rs/blog/sqlite-pragma-cheatsheet-for-performance-and-consistency/
const PRAGMAS = [
  "foreign_keys = ON",
  "journal_mode = WAL",
  "synchronous = normal",
];

PRAGMAS.forEach((p) => {
  db.exec([{ sql: `PRAGMA ${p};`, args: [] }], false, () => null);
});

export function insert({ sql }: SQLite.Query) {
  db.transaction((tx) => {
    tx.executeSql(sql);
  });
}

export function read({ sql }: SQLite.Query) {
  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, { rows: { _array } }) => res(_array),
        (_, err) => {
          rej(err);
          return false;
        }
      );
    });
  });
}

// export function update(_: SQLite.Query) {}

// export function remove(_: SQLite.Query) {}

export default db;
