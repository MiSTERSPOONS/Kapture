import io from 'socket.io-client';
import { WebSocket, Server, SocketIO } from 'mock-socket'
let socket;

if (process.env.NODE_ENV === 'test') {
  console.log('Inside Testing Environment')
  socket = WebSocket
} else {
  socket = io(window.location.origin);
  socket.on('connect', () => {
    console.log('Connected')
  })
}

export default socket;
