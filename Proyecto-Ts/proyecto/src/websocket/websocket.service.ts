import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

interface ConnectedClients {
    [client_id: string]: {
        socket: Socket;
        client_id: string;
    };

} 
@Injectable()
export class WebSocketService {
    private connectedClients: ConnectedClients = {};

    registerClient (client: Socket, client_id: string): void {
        this.connectedClients[client.id] = { socket: client, client_id };
    }

    removeClient ( client_id: string): void {
        delete this.connectedClients[client_id]
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients)
    }

    broadcastEvent (event: string, data: any): void {
        for (const client of Object.values(this.connectedClients)) {
            client.socket.emit(event, data);
        }
    }
}