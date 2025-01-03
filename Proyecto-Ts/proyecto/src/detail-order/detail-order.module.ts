import { Module } from '@nestjs/common';
import { DetailOrderController } from './detail-order.controller';
import { DetailOrderService } from './detail-order.service';
import { HttpModule } from '@nestjs/axios';
import { DetailOrderResolver } from './resolvers/detail-order.resolver';

@Module({
  imports: [HttpModule],
  controllers: [DetailOrderController],
  providers: [DetailOrderService, DetailOrderResolver]
})
export class DetailOrderModule {}
