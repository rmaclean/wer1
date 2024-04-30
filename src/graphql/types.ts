import {Field, ID, Int, InterfaceType, ObjectType} from 'type-graphql';
import {v4 as uuidv4} from 'uuid';

@InterfaceType()
abstract class Base {
  @Field(type => ID)
  id!: string;
  @Field()
  created_at!: Date;
  @Field()
  updated_at!: Date;

  constructor() {
    this.id = uuidv4();
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

@ObjectType({implements: Base})
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
