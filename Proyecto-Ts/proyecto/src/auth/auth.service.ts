import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(email: string, password: string) {
    const url = 'http://localhost:5000/login';
    const payload = { email, password };

    try {
      const response = await lastValueFrom(this.httpService.post(url, payload));
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Error en el servicio Python');
      }
      throw new Error('Error al conectar con el servicio Python');
    }
  }

  async register(first_name:string, last_name:string, email:string, phone:string, address: string, password:string){
    const url = 'http://localhost:5000/register';
    const payload = { first_name, last_name, email, phone, address, password };

    try {
        const response = await lastValueFrom(this.httpService.post(url, payload));
        return response.data;
    } catch (error){
        if(error.response) {
            throw new Error(error.response.data.error || 'Error en el servicio Python');
        }
        throw new Error('Error al conectar con el servicio Python');
    }
  }
}
