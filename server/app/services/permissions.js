import WorkspaceModel from '../models/workspaceModel';

export const checkWorkspacePermission = async (req, res, next) => {
  const { id } = req.body;
  const { user } = req.user;

  if (!id) {
    res.status(404).json({
      errorType: 'WORKSPACE_NOT_FOUND',
      errorMessage: ' Was not able to find specified workspace.',
    });
    return;
  }

  const workspace = await WorkspaceModel.findById(id);
  if (!workspace) {
    res.status(404).json({
      errorType: 'WORKSPACE_NOT_FOUND',
      errorMessage: ' Was not able to find specified workspace.',
    });
    return;
  }

  if (!workspace.ownedBy._id === user._id) {
    res.status(403).json({
      errorType: 'ACCESS_DENIED',
      errorMessage: 'You do not have permission to access this workspace.',
    });
    return;
  }

  next();
};
