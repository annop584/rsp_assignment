import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

// @WebSocketGateway(755, { namespace: 'rsp' })
@WebSocketGateway()
export class RspGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('msgToClient', message);
  }
}
