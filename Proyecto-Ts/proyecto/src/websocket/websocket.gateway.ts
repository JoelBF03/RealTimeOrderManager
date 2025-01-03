import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { OrderService } from "../order/order.service";
import { CreateOrderInput } from "src/order/dto/create-order.input";

@WebSocketGateway({ cors: { origin: '*' } })
export class WebSocketGatewayImplementation implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private readonly orderService: OrderService) {}

    private connectedClients: Record<string, { socket: Socket; client_id: string }> = {};

    async handleConnection(client: Socket): Promise<void> {
        const rawToken = client.handshake.auth?.token || client.handshake.headers?.authorization;
        const token = rawToken?.replace('Bearer ', ''); 
    
        if (!token) {
            console.error('Token no proporcionado.');
            client.disconnect();
            return;
        }
    
        try {
            const orders = await this.orderService.getOrders(token);
            this.connectedClients[client.id] = { socket: client, client_id: token };
            client.emit('orders-updated', orders);
        } catch (error) {
            console.error('Error al manejar conexión WebSocket:', error.message);
            client.disconnect();
        }
    }
    

    handleDisconnect(client: Socket): void {
        delete this.connectedClients[client.id];
    }

    @SubscribeMessage('create-order')
    async onCreateOrder(client: Socket, payload: CreateOrderInput): Promise<void> {
    
        const token = this.connectedClients[client.id]?.client_id;
    
        if (!token) {
            console.error('Token inválido o no proporcionado.');
            client.emit('error', { message: 'Token inválido' });
            return;
        }
    
        try {
            const newOrder = await this.orderService.createOrder(token, payload);    
            const updatedOrders = await this.orderService.getOrders(token);
    
            this.server.emit('orders-updated', updatedOrders);
        } catch (error) {
            client.emit('error', { message: 'Error al crear la orden.' });
        }
    }
} 