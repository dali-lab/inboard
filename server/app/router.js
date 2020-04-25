import { Router } from 'express';
import * as UserController from './controllers/userController';
import { requireAuth, requireSignIn } from './services/passport';

const router = Router();

router
  .route('/user')
  .post(UserController.createUser)
  .get(requireAuth, UserController.getUser);

router.route('/session').post(requireSignIn, UserController.signInUser);

export default router;
