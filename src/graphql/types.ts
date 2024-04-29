import {Field, ID, Int, InterfaceType, ObjectType} from 'type-graphql';

@InterfaceType()
abstract class Base {
  @Field(type => ID)
  id!: string;
  created_at!: Date;
  updated_at!: Date;
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
