const logger = require('../../config/logger');
const io = require('../../config/socket').instance;
const UserService = require('../../services/v1/user');

const SocketEvents = {
  onConnection: (socket) => {
    const clientOrigin = socket.handshake.headers.origin;
    logger.info(`Client connected: ${clientOrigin}`);
  },

  onDisconnection: socket => () => {
    const clientOrigin = socket.handshake.headers.origin;
    logger.info(`Client disconnected: ${clientOrigin}`);
  },

  onMessage: socket => user => (message) => {
    socket.emit('message', message.message);
  },

  onUsers: socket => async () => {
    const clientOrigin = socket.handshake.headers.origin;
    logger.info(`${clientOrigin} requested users`);
    const users = await UserService.list({ count: true });
    socket.emit('users', users);
  },
};

const SocketService = {
  init: () => {
    io.on('connection', async (socket) => {
      const userId = socket.handshake.query.user_id;
      const user = await UserService.findOne({ id: userId });
      if (!user) {
        socket.disconnect();
      }

      SocketEvents.onConnection(socket);

      socket.on(`message-${user.id}`, SocketEvents.onMessage(socket)(user));

      socket.on('users', SocketEvents.onUsers(socket));

      socket.on('disconnect', SocketEvents.onDisconnection(socket));
    });
  },
};

module.exports = SocketService;
