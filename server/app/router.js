import { Router } from 'express';
import * as UserController from './controllers/userController';
import * as WorkspaceController from './controllers/workspaceController';

import { requireAuth, requireSignIn } from './services/passport';
import { checkWorkspacePermission } from './services/permissions';

const router = Router();

router
  .route('/user')
  .post(UserController.createUser)
  .get(requireAuth, UserController.getUser);

router
  .route('/workspace')
  .post(WorkspaceController.createNewWorkspace)
  .get(checkWorkspacePermission, WorkspaceController.getWorkspace)
  .patch(checkWorkspacePermission, WorkspaceController.editWorkspace);

router.route('/session').post(requireSignIn, UserController.signInUser);

export default router;
