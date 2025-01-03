import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DetailOrder {
    @Field(() => Int)
    id: number;
    
    @Field(() => Int)
    order_id: number;

    @Field(() => Int)
    service_order_id: number

    @Field()
    clothes: string;

    @Field(() => Int)
    quantity: number;

    @Field(() => Float)
    subtotal_price: number;
}