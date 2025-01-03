import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentMethodService {
    constructor(private readonly httpService: HttpService) { }

    async getPaymentMethods(token: string) {
        const url = 'http://localhost:5000/payment-method';
      
        try {
          const response = await lastValueFrom(
            this.httpService.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          );
          return response.data;
        } catch (error) {
          console.error('Error al conectar con el servicio Python:', error.response?.data || error.message);
          throw new Error(error.response?.data?.error || 'Error en el servicio Python');
        }
      }
      

    async getPaymentMethod(id: string, token: string) {
        const url = `http://localhost:5000/payment-method/${id}`

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
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async createpaymentMethod(token: string, method_name: string) {
        const url = 'http://localhost:5000/payment-method';
        const payload = { method_name };

        try {
            const response = await lastValueFrom(this.httpService.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    async updatepaymentMethod(id: string, token: string, method_name: string) {
        const url = `http://localhost:5000/payment-method/${id}`;
        const payload = { method_name };

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
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }

    async deletepaymentMethod(id: string, token: string){
        const url = `http://localhost:5000/payment-method/${id}`;
        
        try {
            const response = await lastValueFrom(this.httpService.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        );
        if (response.data && response.data.message) {
            return response.data.message; 
        }        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error || 'Error en el servicio Python');
            }
            throw new Error('Error al conectar con el servicio Python');
        }
    }
}
