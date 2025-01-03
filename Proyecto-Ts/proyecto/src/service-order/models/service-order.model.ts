import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ServiceOrder {
  @Field(() => Int)
  id: number;

  @Field()
  service_name: string;

  @Field(() => Float)
  price: number;
}
