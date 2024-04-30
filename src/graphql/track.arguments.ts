import {ArgsType, Field, Int} from 'type-graphql';
import {Min, Max} from 'class-validator';

@ArgsType()
export class FindAllArgs {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;
}

@ArgsType()
export class FindOneArgs {
  @Field()
  name!: string;

  @Field()
  artist_name!: string;
}

@ArgsType()
export class GetOneArgs {
  @Field()
  id!: string;
}
