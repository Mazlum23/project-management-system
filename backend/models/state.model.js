const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
  state_name: { type: String, required: true },
  state_desc: { type: String, required: true },
  task_name: { type: String, required: true },
}, {
  timestamps: true,
});

const State = mongoose.model('State', stateSchema);

module.exports = State;