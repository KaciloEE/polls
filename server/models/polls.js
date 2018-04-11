const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: String,
  author: {type: Schema.Types.ObjectId},
  authorName: String,
  date: {type: Date, default: Date.now},
  pollTotal: {type: Number, default: 0},
  answer: [{type: Schema.Types.ObjectId}],
  option: {
    type: [{
      name: {
        type: String
      },
      votes: {type: Number, default: 0}
    }],
    default: [{name: 'Yes', votes: 0}, {name: 'No', votes: 0}]
  }
});

mongoose.model('polls', PollSchema);
