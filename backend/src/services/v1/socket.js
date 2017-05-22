const _ = require('lodash');
const logger = require('../../config/logger');
const io = require('../../config/socket').instance;
const Client = require('../../classes/client');
const UserService = require('../../services/v1/user');
const MessageService = require('../../services/v1/message');

const SocketService = {};

const SocketEvents = {
  onConnection: async (client) => {
    const clientOrigin = client.socket.handshake.headers.origin;
    client.user.online = true;
    await UserService.update(client.user);
    client.socket.emit('user', client.user);
    client.socket.broadcast.emit('online', client.user);
    logger.info(`Client connected: ${clientOrigin}`);
  },

  onDisconnection: client => async () => {
    const clientOrigin = client.socket.handshake.headers.origin;
    const index = SocketService.clients.indexOf(client);
    SocketService.clients.splice(index, 1);
    client.user.online = false;
    await UserService.update(client.user);
    client.socket.broadcast.emit('offline', client.user);
    logger.info(`Client disconnected: ${clientOrigin}`);
  },

  onTyping: client => async (to) => {
    const target = SocketService.getClientByUser(to);
    if (!target) return;

    target.socket.emit('typing', client.user);
  },

  onStoppedTyping: client => async (to) => {
    const target = SocketService.getClientByUser(to);
    if (!target) return;

    target.socket.emit('stopped-typing', client.user);
  },

  onMessage: client => async (message) => {
    const to = await UserService.findOne({ _id: message.to._id });
    message = await MessageService.create({
      from: client.user,
      to,
      message: message.text,
    });

    client.socket.emit('message', message);

    const target = SocketService.getClientByUser(to);
    if (!target) return;
    target.socket.emit('message', message);
  },

  onMessages: client => async () => {
    const messages = await MessageService.list({
      criteria: {
        $or: [
          { from: client.user },
          { to: client.user },
        ],
      },
    });

    client.socket.emit('messages', messages);
  },

  onUsers: client => async () => {
    const clientOrigin = client.socket.handshake.headers.origin;
    logger.info(`${clientOrigin} requested users`);
    const users = await UserService.list({ criteria: { online: true }, count: true });
    client.socket.emit('users', users);
  },
};

SocketService.init = () => {
  io.on('connection', async (socket) => {
    const { query } = socket.handshake;
    let user = await UserService.findOne({ name: query.name });

    if (!user) {
      try {
        user = await UserService.create(query);
      } catch (ex) {
        logger.error(ex);
        return socket.disconnect();
      }
    }

    const client = new Client(user, socket);
    SocketService.clients.push(client);

    SocketEvents.onConnection(client);

    socket.on('typing', SocketEvents.onTyping(client));

    socket.on('stopped-typing', SocketEvents.onStoppedTyping(client));

    socket.on('message', SocketEvents.onMessage(client));

    socket.on('messages', SocketEvents.onMessages(client));

    socket.on('users', SocketEvents.onUsers(client));

    socket.on('disconnect', SocketEvents.onDisconnection(client));
  });
};

SocketService.clients = [];

SocketService.getClientByUser = user => SocketService.clients
    .find(client => _.isEqual(client.user._id, user._id));

module.exports = SocketService;
