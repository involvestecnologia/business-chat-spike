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
};

module.exports = UserService;
