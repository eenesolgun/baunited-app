// SocketManager.js
import io from "socket.io-client";

const SERVER_URL = "http://192.168.1.112:3000";

class SocketManager {
  constructor() {
    this.socket = io(SERVER_URL);
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });
  }

  sendMessage(message) {
    this.socket.emit("messageToServer", message);
  }

  receiveMessage(callback) {
    this.socket.on("messageFromServer", callback);
  }
}

export default new SocketManager();
