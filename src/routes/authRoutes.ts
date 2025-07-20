import express from 'express';
import { login} from '../controllers/authController';
import { validateBody } from '../utils/validate';
import { loginSchema } from '../validators/authValidators';

const router = express.Router();
router.post('/login', validateBody(loginSchema), login);


export default router;
