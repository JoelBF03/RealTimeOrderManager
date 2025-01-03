import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { HttpModule } from '@nestjs/axios';
import { OrderResolver } from './resolvers/order.resolver'
import { WebSocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [HttpModule, WebSocketModule],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
