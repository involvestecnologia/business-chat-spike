const io = require('socket.io')();

module.exports.init = conn => io.listen(conn);
module.exports.instance = io;
