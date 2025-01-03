import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {

  @Field(() => Int, { nullable: true })
  payment_method_id?: number;

}
