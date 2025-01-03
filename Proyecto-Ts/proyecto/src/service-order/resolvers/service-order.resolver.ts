import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceOrder } from '../models/service-order.model';
import { ServiceOrderService } from '../service-order.service';

@Resolver(() => ServiceOrder)
export class ServiceOrderResolver {
  constructor(private readonly serviceOrderService: ServiceOrderService) { }

  @Query(() => [ServiceOrder], { name: 'services' })
  async getServices(@Context() context: any) {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.serviceOrderService.getServices(token);
  }

  @Query(() => ServiceOrder, { name: 'service' })
  async getService(@Context() context: any, @Args('id') id: string) {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.serviceOrderService.getService(id, token);
  }

  @Mutation(() => ServiceOrder)
  async createService(@Context() context: any, @Args('service_name') service_name: string, @Args('price') price: number) {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.serviceOrderService.createService(token, service_name, price);
  }

  @Mutation(() => ServiceOrder)
  async updateService ( 
    @Context() context: any,
    @Args('id') id: string,
    @Args('service_name', { nullable: true }) service_name?: string,
    @Args('price', { nullable: true }) price?: number
  ) {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.serviceOrderService.updateService(id, token, service_name, price)
  }

  @Mutation(() => String)
  async deleteService(@Context() context: any, @Args('id') id: string): Promise<String> {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.serviceOrderService.deleteService(id, token);
  }
}