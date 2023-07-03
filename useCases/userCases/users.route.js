import express from 'express';
import getOneUserById from './getOneUserById/getOneUserById.js';
import getOneUserByUsername from './getOneUserByUsername/getOneUserByUsername.js';
import getUsers from './getUsers/getUsers.js';
import saveUser from './saveUser/saveuser.js';

const usersRoute = express.Router();

usersRoute.get('/', getUsers);
usersRoute.post('/one/byUsername', getOneUserByUsername);
usersRoute.post('/one/', getUsers);
usersRoute.post('/byId/', getOneUserById);
usersRoute.post('/save', saveUser);

export default usersRoute;