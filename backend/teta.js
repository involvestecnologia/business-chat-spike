require('./src/config/mongoose');

const User = require('./src/models/v1/user');

const user1 = new User({ id: 1, name: 'Teste 1' });

const user2 = new User({ id: 2, name: 'Teste 2' });

setTimeout(() => {
  user1.save();

  user2.save();
}, 2000);
