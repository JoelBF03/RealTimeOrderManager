import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UpdateDetailInput } from './dto/update-detail.input';

@Injectable()
export class DetailOrderService {
    constructor (private readonly httpService: HttpService) {}

    async getDetails(token: string) {
        const url = 'http://localhost:5000/details';

        try {
            const response = await lastValueFrom (this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        );
        return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async getDetail(id: string, token: string) {
        const url = `http://localhost:5000/details/${id}`;

        try {
            const response = await lastValueFrom (this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        );
        return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async updateDetail(id: string, token: string, input: UpdateDetailInput) {
        const url = `http://localhost:5000/details/${id}`;

        try {
            const response = await lastValueFrom (this.httpService.put(url, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        );
        return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async deleteDetail(id: string, token: string) {
        const url = `http://localhost:5000/details/${id}`;

        try {
            const response = await lastValueFrom (this.httpService.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
        );
        return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }
}
