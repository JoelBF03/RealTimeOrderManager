import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DetailOrder } from '../models/detail-order.model';
import { DetailOrderService } from '../detail-order.service';
import { UpdateDetailInput } from '../dto/update-detail.input';

@Resolver(() => DetailOrder)
export class DetailOrderResolver {
    constructor(private readonly detailOrderService: DetailOrderService) { }

    @Query(() => [DetailOrder], { name: 'detailOrders' })
    async getDetails(@Context() context: any) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.detailOrderService.getDetails(token);
    }

    @Query(() => DetailOrder, { name: 'detailOrder' })
    async getDetail(@Context() context: any, @Args('id') id: string) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.detailOrderService.getDetail(id, token);
    }

    @Mutation(()=> DetailOrder)
    async updateDetail(@Context() context: any, @Args('id') id: string, @Args('input') input: UpdateDetailInput) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.detailOrderService.updateDetail(id, token, input);
    }

    @Mutation(()=> String)
    async deleteDetail(@Context() context: any, @Args('id') id: string) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing in the Authorization header');
        }
        return await this.detailOrderService.deleteDetail(id, token);
    }
}