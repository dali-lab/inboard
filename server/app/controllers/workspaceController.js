import WorkspaceModel from '../models/workspaceModel';

export const createNewWorkspace = async (req, res, next) => {
  const { title } = req.body;
  const { user } = req.user;

  const newWorkspace = new WorkspaceModel({
    title,
    ownedBy: user,
  });

  try {
    const savedWorkspace = await newWorkspace.save();
    res.status(200).json(savedWorkspace);
  } catch (e) {
    res.status(500).json({
      errorType: 'INTERNAL_SERVER_ERROR',
      errorMessage: 'Something went wrong, please try again later.',
    });
  }
};

export const editWorkspace = async (req, res, next) => {
  const { id, title } = req.body;
  const { user } = req.user;

  const workspace = await WorkspaceModel.findById(id);

  workspace.title = title;
  try {
    const newWorkspace = await workspace.save();
    res.status(200).json(newWorkspace);
  } catch (e) {
    res.status(500).json({
      errorType: 'INTERNAL_SERVER_ERROR',
      errorMessage: 'Something went wrong, please try again later.',
    });
  }
};

export const getWorkspace = async (req, res, next) => {
  const { id } = req.body;
  const { user } = req.user;

  const workspace = await WorkspaceModel.findById(id);

  res.status(200).json(workspace);
};
