import Express from 'express';
import Dotenv from 'dotenv';
import {register} from '../controllers/AuthController';


Dotenv.config();

const Router = Express.Router();

// login
// Router.get('/login', async (req, res) => {

// });

Router.post('/register', register);




export default Router;