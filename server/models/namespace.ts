import * as mongoose from 'mongoose';

const namespaceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: String,
  prefix: String,
  description: String,
  file: String
});

//omit the __v when returning a namespace
namespaceSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  }
});

const Namespace = mongoose.model('Namespace', namespaceSchema);

export default Namespace;
