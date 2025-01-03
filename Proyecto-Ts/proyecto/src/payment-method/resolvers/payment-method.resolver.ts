import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentMethod } from '../models/payment-method.model';
import { PaymentMethodService } from '../payment-method.service';


@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
    constructor (private readonly paymentMethodService: PaymentMethodService) {}

    @Query(() => [PaymentMethod], { name: 'paymentMethods' })
    async getPaymentMethods(@Context() context: any) {
      const authorizationHeader = context.req.headers.authorization;
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        throw new Error('Token is missing in the Authorization header');
      }
      return await this.paymentMethodService.getPaymentMethods(token);
    }

    @Query(() => PaymentMethod, { name: 'paymentMethod' })
    async getPaymentMethod(@Context() context: any, @Args('id') id: string) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
          throw new Error('Token is missing in the Authorization header');
        }
        return await this.paymentMethodService.getPaymentMethod(id, token); 
    }
    
    @Mutation(() => PaymentMethod)
    async createPaymentMethod(@Context() context: any, @Args('method_name') method_name: string) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
          throw new Error('Token is missing in the Authorization header');
        }
        return await this.paymentMethodService.createpaymentMethod(token, method_name);
    }

    @Mutation(() => PaymentMethod)
    async updatePaymentMethod(@Context() context: any, @Args('id') id: string, @Args('method_name') method_name: string) {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
          throw new Error('Token is missing in the Authorization header');
        }
        return await this.paymentMethodService.updatepaymentMethod(id, token, method_name);
    }

    @Mutation(() => String)
    async deletePaymentMethod(@Context() context: any, @Args('id') id: string): Promise<string> {
        const authorizationHeader = context.req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
          throw new Error('Token is missing in the Authorization header');
        }
        return await this.paymentMethodService.deletepaymentMethod(id, token);
    }    
}