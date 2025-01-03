import { Module } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderController } from './service-order.controller';
import { HttpModule } from '@nestjs/axios';
import { ServiceOrderResolver } from './resolvers/service-order.resolver';

@Module({
  imports: [HttpModule],
  providers: [ServiceOrderService, ServiceOrderResolver],
  controllers: [ServiceOrderController]
})
export class ServiceOrderModule {}
