const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: { type: String, required: true },
  project_desc: { type: String, required: true },
  username: { type: String, required: true },
  progress: { type: String, required: true },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;