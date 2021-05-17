import { Router } from 'express';
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares/index";

// registrarse
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
// ingresar
router.post('/signin', authCtrl.signin);

export default router;