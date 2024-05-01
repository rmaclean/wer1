import PouchDb from 'pouchdb';
import find from 'pouchdb-find';

export class Database {
  private db?: PouchDB.Database<{}>;

  createDBInstance = async () => {
    if (this.db) {
      return this.db;
    }

    PouchDb.plugin(find);
    const db = new PouchDb('wer1');

    await db.createIndex({
      index: { fields: ['name', 'artist_name'] },
    });

    await db.createIndex({
      index: { fields: ['id'] },
    });

    this.db = db;
    return db;
  };
}
