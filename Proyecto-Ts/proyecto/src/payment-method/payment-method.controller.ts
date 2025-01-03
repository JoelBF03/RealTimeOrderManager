import { UseGuards, Headers, Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/payment-methods')
@UseGuards(AuthGuard)
export class PaymentMethodController {
    constructor (private readonly paymentMethodService: PaymentMethodService) {}

    @Get()
    async paymentMethod(@Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer' , '');
        return await this.paymentMethodService.getPaymentMethods(token);
    }

    @Get(':id')
    async paymentMethodID(@Param('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer' , '');
        return await this.paymentMethodService.getPaymentMethod(id, token);
    }

    @Post()
    async createpaymentMethod(@Headers ('Authorization') authorization: string, @Body('method_name') method_name: string) {
        const token = authorization.replace('Bearer' , '');
        return await this.paymentMethodService.createpaymentMethod(token, method_name);
    }

    @Put(':id')
    async updatepaymentMethod(@Param('id') id: string, @Headers('Authorization') authorization: string, @Body() body: { method_name: string }) {
        const token = authorization.replace('Bearer' , '');
        return await this.paymentMethodService.updatepaymentMethod(id, token, body.method_name);
    }

    @Delete(':id')
    async deletepaymentMethod(@Param('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer' , '');
        return await this.paymentMethodService.deletepaymentMethod(id, token);
    }
}
