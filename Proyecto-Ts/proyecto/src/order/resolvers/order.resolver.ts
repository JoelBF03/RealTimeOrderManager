import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from '../models/order.model';
import { OrderService } from '../order.service';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';


@Resolver(() => Order)
export class OrderResolver {
    constructor (private readonly orderService: OrderService) {}

    @Query(() => [Order], { name: 'orders' })
    async getOrders(@Context() context: any) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }        return await this.orderService.getOrders(token);
    }

    @Query(() => Order, { name: 'order' })
    async getOrder(@Context() context: any, @Args('id') id: string ) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }        return await this.orderService.getOrder(id, token);
    }

    @Mutation(()=> Order)
    async createOrder(@Context() context: any, @Args('input') input: CreateOrderInput) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.orderService.createOrder(token, input);
    }

    @Mutation(() => Order)
    async updateOrder(@Context() context: any, @Args('id') id: string, @Args('input') input: UpdateOrderInput) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.orderService.updateOrder(id, token, input);
    }

    @Mutation(() => String)
    async deleteOrder(@Context() context: any, @Args('id') id: string ) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.orderService.deleteOrder(id, token);
    }
}