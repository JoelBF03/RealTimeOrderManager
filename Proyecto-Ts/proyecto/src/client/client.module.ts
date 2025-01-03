import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { HttpModule } from '@nestjs/axios';
import { ClientResolver } from './resolvers/client.resolver';

@Module({
  imports: [HttpModule],
  controllers: [ClientController],
  providers: [ClientService, ClientResolver]
})
export class ClientModule {}
