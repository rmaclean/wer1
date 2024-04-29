import {Service} from 'typedi';
import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import {FindAllArgs, FindOneArgs} from './track.arguments.js';

@Service()
export class TrackService {
  private db!: PouchDB.Database<{}>;

  private constructor(db: PouchDB.Database<{}>) {
    this.db = db;
  }

  static createTrackService = async () => {
    PouchDb.plugin(find);
    const db = new PouchDb('wer1');

    await db.createIndex({
      index: {fields: ['name', 'artist_name']},
    });

    await db.createIndex({
      index: {fields: ['id']},
    });

    return new TrackService(db);
  };

  findAll = async (args: FindAllArgs) => {
    const {rows} = await this.db.allDocs({
      include_docs: true,
      skip: args.skip,
      limit: args.take,
    });

    return rows;
  };

  findOne = async (args: FindOneArgs) => {
    const {docs} = await this.db.find({
      selector: {
        name: args.name,
        artist_name: args.artist_name,
      },
    });

    if (docs.length === 0) {
      return null;
    }

    return docs[0];
  };
}
