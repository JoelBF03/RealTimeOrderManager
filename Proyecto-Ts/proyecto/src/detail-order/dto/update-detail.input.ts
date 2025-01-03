import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateDetailInput {
  @Field(() => Int, { nullable: true })
  service_order_id?: number;

  @Field({ nullable: true })
  clothes?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  subtotal_price?: number;
}
