import { Field, ID, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
abstract class Base {
  @Field(type => ID, { name: 'id' })
  readonly _id!: string;

  @Field()
  readonly created_at!: Date;

  @Field()
  updated_at!: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

@ObjectType({ implements: Base })
export class Track extends Base {
  @Field()
  name!: string;

  @Field()
  artist_name!: string;

  @Field(type => Int)
  duration!: number;

  @Field()
  IRSC!: string;

  @Field()
  release_date!: Date;
}

@ObjectType()
export class DeletedTrack {
  @Field(type => ID)
  id!: string;

  constructor(id: string) {
    this.id = id;
  }
}
