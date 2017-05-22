const _ = require('lodash');
const Promise = require('bluebird');
const User = require('../../models/v1/user');

const UserService = {
  list: (query) => {
    const promises = {
      data: User
        .find(query.criteria, query.fields)
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort),
    };

    if (query.count) {
      promises.count = User.count(query.criteria);
    }

    return Promise.props(promises);
  },

  findOne: query => User.findOne(query).exec(),

  create: body => new User(body).save(),

  update: async (body) => {
    const client = await UserService.findOne({ _id: body._id });
    if (!client) throw new Error(`Client ${body._id} not found`);

    await _.extend(client, body).save();
  },
};

module.exports = UserService;
