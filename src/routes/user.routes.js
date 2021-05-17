import { Router } from 'express';
const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

// create a user
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], userCtrl.createUser);
// get all user
router.get('/', userCtrl.getUsers);

export default router;