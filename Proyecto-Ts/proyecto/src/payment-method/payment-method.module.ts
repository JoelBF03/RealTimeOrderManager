import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { HttpModule } from '@nestjs/axios';
import { PaymentMethodResolver } from './resolvers/payment-method.resolver';

@Module({
  imports: [HttpModule],
  providers: [PaymentMethodService, PaymentMethodResolver],
  controllers: [PaymentMethodController]
})
export class PaymentMethodModule {}
