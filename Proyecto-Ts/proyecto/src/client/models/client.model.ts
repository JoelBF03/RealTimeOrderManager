import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Client {

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field()
    address: string;
}