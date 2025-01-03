import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { DetailOrder } from "src/detail-order/models/detail-order.model";

@ObjectType()
export class Order {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    client_id: number;

    @Field(() => Int)
    payment_method_id: number;

    @Field(() => Float)
    total_price: number;

    @Field(() => [DetailOrder])
    details: DetailOrder[];
}