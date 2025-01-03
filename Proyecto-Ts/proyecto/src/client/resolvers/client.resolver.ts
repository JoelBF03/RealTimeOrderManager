import { Context, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from '../client.service';
import { Client } from '../models/client.model';

@Resolver(() => Client)
export class ClientResolver {
    constructor (private readonly clientService: ClientService) {}

    @Query(() => Client, { name: 'profile' })
    async getClient(@Context() context: any) {
      const authorizationHeader = context.req.headers.authorization;
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        throw new Error('Token is missing in the Authorization header');
      }
      return await this.clientService.getclient(token);
    }
}