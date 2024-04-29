import {Inject, Service} from 'typedi';

@Service()
export class TrackService {
  @Inject('db')
  private db!: PouchDB.Database<{}>;

  findAll = async (args: {skip: number; take: number}) => {
    const {rows} = await this.db.allDocs({
      include_docs: true,
      skip: args.skip,
      limit: args.take,
    });

    console.dir(rows);
    return rows;
  };
}
