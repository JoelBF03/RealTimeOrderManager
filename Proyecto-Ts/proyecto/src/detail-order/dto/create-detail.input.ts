import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateDetailInput {
  @Field(() => Int)
  service_order_id: number;

  @Field()
  clothes: string;

  @Field(() => Int)
  quantity: number;
}
