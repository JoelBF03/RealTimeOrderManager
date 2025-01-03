import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { CreateDetailInput } from 'src/detail-order/dto/create-detail.input';

@InputType()
export class CreateOrderInput {

  @Field(() => Int)
  payment_method_id: number;

  @Field(() => [CreateDetailInput])
  details: CreateDetailInput[];
}
