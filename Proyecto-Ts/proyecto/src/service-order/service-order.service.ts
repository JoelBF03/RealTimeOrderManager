import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ServiceOrderService {
    constructor(private readonly httpService: HttpService) { }

    async getServices(token: string) {
        const url = "http://localhost:5000/service";

        try {
            const response = await lastValueFrom(this.httpService.get(url, {
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

    async getService(id: string, token: string) {
        const url = `http://localhost:5000/service/${id}`;

        try {
            const response = await lastValueFrom(this.httpService.get(url, {
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

    async createService(token: string, service_name: string, price: number) {
        const url = "http://localhost:5000/service";
        const payload = { service_name, price };

        try {
            const response = await lastValueFrom(this.httpService.post(url, payload, {
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

    async updateService(id: string, token: string, service_name?: string, price?: number) {
        const url = `http://localhost:5000/service/${id}`;
        const payload = { service_name, price };

        try {
            const response = await lastValueFrom(this.httpService.put(url, payload, {
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

    async deleteService(id: string, token: string) {
        const url = `http://localhost:5000/service/${id}`;

        try {
            const response = await lastValueFrom(this.httpService.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
            );
            if (response.data && response.data.message) {
                return response.data.message;
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }
}
