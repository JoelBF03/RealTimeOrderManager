import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/service')
@UseGuards(AuthGuard)
export class ServiceOrderController {
    constructor (private readonly serviceOrderService: ServiceOrderService) {}

    @Get()
    async getServices(@Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.serviceOrderService.getServices(token);
    }

    @Get(':id')
    async getService(@Param('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.serviceOrderService.getService(id, token);
    }

    @Post()
    async createService(@Headers('Authorization') authorization: string, @Body() body: {service_name: string, price: number}) {
        const token = authorization.replace('Bearer ', '');
        return await this.serviceOrderService.createService(token, body.service_name, body.price);
    }

    @Put(':id')
    async updateService(@Param('id') id: string, @Headers('Authorization') authorization: string, @Body() body: {service_name: string, price: number}) {
        const token = authorization.replace('Bearer ', '');
        return await this.serviceOrderService.updateService(id, token, body.service_name, body.price);
    }

    @Delete(':id')
    async deleteService(@Param('id') id: string, @Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.serviceOrderService.deleteService(id, token,);
    }
}
