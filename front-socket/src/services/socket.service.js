import { io } from 'socket.io-client';
import store from '../store/index'

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    let liveData = {};
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

    this.socket.on('my broadcast', (data) => {
      liveData = data;
      console.log('live: ' + liveData);
    });

    this.socket.on('refreshList', () => {
      store.dispatch('refreshList');
    })
  }

  refreshList() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.emit('refreshList');
  }

  sendMessage(message) {
    console.log(message, 'here')
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

    this.socket.emit('my message', message);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();