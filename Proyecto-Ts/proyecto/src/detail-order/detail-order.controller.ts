import { Body, Controller, Delete, Get, Headers, Param, Put, UseGuards } from '@nestjs/common';
import { DetailOrderService } from './detail-order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateDetailInput } from './dto/update-detail.input';

@Controller('api/details')
@UseGuards(AuthGuard)
export class DetailOrderController {
    constructor (private readonly detailOrderService: DetailOrderService) {}

    @Get()
    async getDetails(@Headers ('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return  this.detailOrderService.getDetails(token)
    }

    @Get(':id')
    async getDetail(@Param('id') id: string, @Headers ('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return  this.detailOrderService.getDetail(id, token)
    }

    @Put(':id')
    async updateDetail(@Param('id') id: string, @Headers ('Authorization') authorization: string, @Body() input:UpdateDetailInput) {
        const token = authorization.replace('Bearer ', '');
        return  this.detailOrderService.updateDetail(id, token, input)
    }

    @Delete(':id')
    async deleteDetail(@Param('id') id: string, @Headers ('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return  this.detailOrderService.deleteDetail(id, token)
    }
}
