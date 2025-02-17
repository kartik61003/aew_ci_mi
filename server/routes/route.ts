import express from 'express';
import { signupcontroller, logincontroller, logoutcontroller} from '../controller/UserController';
import { cirequestcontroller} from '../controller/Cicontroller';
import { getmirequestcontroller} from '../controller/Micontroller';

const route = express.Router();

route.post('/signup', signupcontroller);
route.post('/login', logincontroller);
route.post('/logout', logoutcontroller);
route.post('/ci', cirequestcontroller);
route.get('/getmi', getmirequestcontroller);

export default route;

