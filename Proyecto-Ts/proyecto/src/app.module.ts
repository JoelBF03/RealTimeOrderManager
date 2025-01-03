import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ClientModule } from './client/client.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { OrderModule } from './order/order.module';
import { DetailOrderModule } from './detail-order/detail-order.module';
import { GraphqlModule } from './graphql/graphql.module';
import { ReportModule } from './report/report.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    PaymentMethodModule,
    ClientModule,
    ServiceOrderModule,
    OrderModule,
    DetailOrderModule,
    GraphqlModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../frontend'),
      serveRoot: '/'
    },
    {
      rootPath: path.join(__dirname, '../reports'),
      serveRoot: '/reports'
    }),
    WebSocketModule
  ],
})
export class AppModule {}