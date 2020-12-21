import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db')

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT NOT NULL, alarm DATE)",
        (txObject, result) => console.log('successfully created', result),
        (txObject, err) => console.log('error occurred', err)
    );
});

export default db;