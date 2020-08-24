import * as mongoose from 'mongoose';

const diagramSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  model: String,
  content: Object,
  meta: Object,
  preview: String
});

// Omit the __v when returning a diagram
diagramSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  }
});

const Diagram = mongoose.model('Diagram', diagramSchema);

export default Diagram;
