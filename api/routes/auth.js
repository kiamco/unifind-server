import Express from 'express';
import Dotenv from 'dotenv';
import {register, deleteAll, login, verifyUser} from '../controllers/AuthController.js';
import { verify } from 'crypto';


Dotenv.config();

const Router = Express.Router();

// login
// Router.get('/login', async (req, res) => {

// });

Router.post('/register', verifyUser, register);
Router.delete('/deleteAll', deleteAll);
Router.post('/login', login);
Router.post('/verify', verifyUser);




export default Router;