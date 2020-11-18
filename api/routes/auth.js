import Express from 'express';
import Dotenv from 'dotenv';
import {register, deleteAll, login} from '../controllers/AuthController';


Dotenv.config();

const Router = Express.Router();

// login
// Router.get('/login', async (req, res) => {

// });

Router.post('/register', register);
Router.delete('/deleteAll', deleteAll);
Router.post('/login', login);




export default Router;