import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
    constructor(private readonly httpService: HttpService,) { }

    async getOrders(token: string) {
        const url = "http://localhost:5000/orders";

        try {
            const response = await lastValueFrom(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || "Error en el servicio Python")
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async getOrder(id: string, token: string) {
        const url = `http://localhost:5000/orders/${id}`;

        try {
            const response = await lastValueFrom(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || "Error en el servicio Python")
            }
            throw new InternalServerErrorException("Error al conectar con el servicio Python")
        }
    }

    async createOrder(token: string, input: CreateOrderInput) {
        const url = "http://localhost:5000/orders";
        const payload = {
            payment_method_id: input.payment_method_id,
            details: input.details,
        }

        try {
            const response = await lastValueFrom(this.httpService.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            );

            const createdOrder = response.data;
            return createdOrder;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || "Error en el servicio Python")
            }
            throw new InternalServerErrorException("Error al conectar con el servicio Python")
        }
    }

    async updateOrder(id: string, token: string, input: UpdateOrderInput) {
        const url = `http://localhost:5000/orders/${id}`;
        const payload = {
            payment_method_id: input.payment_method_id,
        }

        try {
            const response = await lastValueFrom(this.httpService.put(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || "Error en el servicio Python")
            }
            throw new InternalServerErrorException("Error al conectar con el servicio Python")
        }
    }

    async deleteOrder(id: string, token: string) {
        const url = `http://localhost:5000/orders/${id}`;

        try {
            const response = await lastValueFrom(this.httpService.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            );
            if (response.data && response.data.message) {
                return response.data.message;
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || "Error en el servicio Python")
            }
            throw new InternalServerErrorException("Error al conectar con el servicio Python")
        }
    }
}
