import express from 'express';
import getOneUser from './getOneUser/getOneUser.js'
import getOneUserById from './getOneUserById/getOneUserById.js';
import getOneUserByUsername from './getOneUserByUsername/getOneUserByUsername.js';
import getUsers from './getUsers/getUsers.js';
import saveUser from './saveUser/saveUser.js';

const usersRoute = express.Router();

usersRoute.get('/', getUsers);
usersRoute.post('/one/byUsername', getOneUserByUsername);
usersRoute.post('/one/', getOneUser);
usersRoute.post('/byId/', getOneUserById);
usersRoute.post('/save', saveUser);

export default usersRoute;