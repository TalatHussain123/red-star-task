import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Todo', TodoSchema);