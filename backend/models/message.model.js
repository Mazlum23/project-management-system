const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message_text: { type: String, required: true },
  to_id: { type: String, required: true },
  from_id: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;