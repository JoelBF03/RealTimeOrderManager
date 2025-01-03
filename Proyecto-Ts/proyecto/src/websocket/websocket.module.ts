import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { WebSocketGatewayImplementation } from "./websocket.gateway";
import { WebSocketService } from "./websocket.service";
import { OrderService } from "src/order/order.service";


@Module({
    imports: [HttpModule],
    providers: [WebSocketGatewayImplementation, WebSocketService, OrderService],
    exports: [WebSocketService],
})

export class WebSocketModule {}