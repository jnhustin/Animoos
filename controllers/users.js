// set and require statements
require('dotenv').config();
const express = require('express');
const User = require('../models/user');

// JSON web token dependencies
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const router = express.Router();

router.route('/')
  // returns object of all users
  .get( (req, res) => {
    console.log('receiving request for all users: ', req.body);
    User.find( (err, users) => {
      if (err) res.status(500).send(err);

      return res.send(users);
    });
  })
  // add new user to db
  // receives user object
  // find the user first in case the email already exists
  .post( (req, res) => {
    console.log('receiving request to post new user: ', req.body);
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) return res.status(400).send({ message: 'Email already exists' });

      User.create(req,body, (err, user) => {
        if (err) return res.status(500).send(err);

        return res.send(user);
      });
    });
  });

router.route('/:id')
  // receives id, finds single user by id
  .get( (req, res) => {
    console.log('receiving request for single user: ', req.body);
    User.findById(req.params.id, (err, user) => {
      if (err) return res.staus(500).send(err);

      return res.send(user);
    });
  })
  // receives user id & update info
  // finds user by id and updates their info
  .put( (req, res) => {
    console.log('put route, req.params: ', req.params);
    console.log('put route, req.body: ', req.body);
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  })
  // receives user id
  // deletes specified user from db
  .delete( (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    })
  })
  
  // if Authenticated, returns a sugned JWT
  router.post('/auth', (req, res) => {
    User.findOne({ email: req.body }, (err, user) => {
      // returns 401 if error or not a user
      if (err || !user) return res.status(401).send({ message: 'User not found' });
      // checks provided password against db password
      const isAuthenticated = user.authenticated(req.body.password);
      // returns 401 if error or bad password
      if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated'});
      // all checks cleared, creates new jwt token
      const token = jwt.sign(user.toJSON(), secret);
      // returns token
      return res.send({ user: user, token: token });
    })  
  });

module.exports = router;