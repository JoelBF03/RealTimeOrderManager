import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Controller('api/orders')
@UseGuards(AuthGuard)
export class OrderController {
    constructor (private readonly orderService: OrderService) {}

    @Get()
    async getOrders(@Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.orderService.getOrders(token);
    }

    @Get(':id')
    async getOrder(@Param ('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.orderService.getOrder(id, token);
    }

    @Post()
    async createOrder(@Headers('Authorization') authorization: string, @Body() input: CreateOrderInput) {
        const token = authorization.replace('Bearer ', '');
        return await this.orderService.createOrder(token, input);
    }
    
    @Put(':id')
    async updateOrder(@Param ('id') id: string, @Headers('Authorization') authorization: string, @Body() input: UpdateOrderInput) {
        const token = authorization.replace('Bearer ', '');
        return await this.orderService.updateOrder(id, token, input);
    }
    
    @Delete(':id')
    async deleteOrder(@Param ('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.orderService.deleteOrder(id, token);
    }
} 