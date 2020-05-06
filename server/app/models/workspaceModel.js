import mongoose, { Schema } from 'mongoose';

const WorkspaceSchema = new Schema({
  title: { type: String, required: true },
  ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
});

WorkspaceSchema.methods.validatePermission = function (user) {
  return this.ownedBy._id === user._id;
};

const WorkspaceModel = mongoose.model('Workspace', WorkspaceSchema);

export default WorkspaceModel;
