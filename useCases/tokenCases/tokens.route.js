import express from 'express';
import getTokens from './getTokens/getTokens.js';
import getOneToken from './getOneToken/getOneToken.js'
import saveToken from './saveToken/saveToken.js'

// Se crea el router para los tokens
const tokensRouter = express.Router();

// Se definen las rutas para los tokens
tokensRouter.get('/', getTokens);
tokensRouter.get('/one/:token', getOneToken);
tokensRouter.post('/save', saveToken);

export default tokensRouter;