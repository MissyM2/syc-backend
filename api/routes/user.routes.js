module.exports = (app) => {
  const users = require('../../../temp/api/controllers/user.controller.js');

  var router = require('express').Router();

  // Create a new User
  router.post('/', users.create);
};
