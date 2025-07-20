import express from 'express';
import { login} from '../controllers/authController.js';
import { validateBody } from '../utils/validate.js';
import { loginSchema } from '../validators/authValidators.js';

const router = express.Router();
router.post('/login', validateBody(loginSchema), login);


export default router;
