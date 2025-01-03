import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientService } from './client.service';

@Controller('api/profile')
@UseGuards(AuthGuard)
export class ClientController {
    constructor (private readonly clientService: ClientService) {}

    @Get()
    async getProfile(@Headers('Authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        return await this.clientService.getclient(token);
    }
}
