const Promise = require('bluebird');
const Message = require('../../models/v1/message');

const UserService = {
  list: (query) => {
    const promises = {
      data: Message
        .find(query.criteria, query.fields)
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort),
    };

    if (query.count) {
      promises.count = Message.count(query.criteria);
    }

    return Promise.props(promises);
  },

  findOne: query => Message.findOne(query).exec(),

  create: body => new Message(body).save(),
};

module.exports = UserService;
