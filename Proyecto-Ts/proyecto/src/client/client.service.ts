import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
    constructor (private readonly httpService: HttpService) {}

    async getclient(token: string) {
        const url = "http://localhost:5000/profile";

        try {
            const response = await lastValueFrom(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        );
        return response.data;
        } catch (error) {
            if (error.response){
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }
}
