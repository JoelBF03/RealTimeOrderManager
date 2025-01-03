import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaymentMethod {
    @Field(() => Int)
    id: number;

    @Field()
    method_name: string;
}