import express from 'express';
import getTokens from './getTokens/getTokens.js';
import getOneToken from './getOneToken/getOneToken.js'
import saveToken from './saveToken/saveToken.js'

const tokensRouter = express.Router();


tokensRouter.get('/', getTokens);
tokensRouter.get('/one/:token', getOneToken);
tokensRouter.post('/save', saveToken);

export default tokensRouter;