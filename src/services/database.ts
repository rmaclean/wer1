import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

export class Database {
  private db?: PouchDB.Database<{}>;

  static createIndexes = async (db:PouchDB.Database<any>) => {
    await db.createIndex({
      index: { fields: ['name', 'artist_name'] },
    })

    await db.createIndex({
      index: { fields: ['id'] },
    });

  };

  createDBInstance = async () => {
    if (this.db) {
      return this.db;
    }

    PouchDB.plugin(find);
    const db = new PouchDB('wer1');

    await Database.createIndexes(db);

    this.db = db;
    return db;
  };
}
