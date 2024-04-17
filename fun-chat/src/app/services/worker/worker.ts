import { Console } from '../../utils/console/console';
import StateManager from '../stateManager/stateManager';
import { ServerInfo } from '../stateManager/types';

class Worker {
  private states: StateManager;

  private serverInfo: ServerInfo;

  private socket: WebSocket;

  private deferredRequests: string[];

  private idSenderDeferredRequests: null | ReturnType<typeof setTimeout>;

  constructor(states: StateManager) {
    Console.appendText('Create Worker');
    this.states = states;
    this.states.worker = this;
    this.serverInfo = this.states.getVal('serverInfo') as ServerInfo;
    this.socket = this.getNewConnection();
    this.deferredRequests = [];
    this.idSenderDeferredRequests = null;
  }

  sendMessage(message: string) {
    this.deferredRequests.push(message);
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    if (!this.idSenderDeferredRequests) this.sendDeferredRequests();
  }

  getNewConnection() {
    Console.appendText(`Query connect to ${this.serverInfo.URL}`);
    const socket = new WebSocket(this.serverInfo.URL);
    this.socket = socket;
    socket.addEventListener('open', (event) => {
      this.states.dispatcher.processOpen(event);
      this.states.splashPage.putAway();
      if (!this.idSenderDeferredRequests)
        this.idSenderDeferredRequests = setTimeout(() => this.sendDeferredRequests(), 100);
    });
    socket.addEventListener('message', (event) => {
      this.states.dispatcher.processMessage(event);
    });
    socket.addEventListener('error', (error) => {
      Console.appendText(`WS error: ${error.type}`);
      this.socket.close();
    });
    socket.addEventListener('close', (event) => {
      Console.appendText(`WS close: ${event.type}`);
      this.states.splashPage.retrieve();
      this.getNewConnection();
    });
    return socket;
  }

  sendDeferredRequests() {
    this.idSenderDeferredRequests = null;
    if (!this.socket) return;
    if (this.deferredRequests.length === 0) return;
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = this.deferredRequests.shift();
      if (message) {
        Console.appendText(`Send message ${message}`);
        this.socket.send(message);
      }
    }
    this.idSenderDeferredRequests = setTimeout(() => this.sendDeferredRequests(), 100);
  }
}

export default Worker;
