const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  author: {
    type: String,
    required: [true, "must provide an author's name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  pages: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model("Book", bookSchema);

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   books: [
//     {
//       title: {
//         type: String,
//         required: [true, "must provide a name"],
//         trim: true,
//         maxlength: [20, "name can not be more than 20 characters"],
//       },
//       author: {
//         type: String,
//         required: [true, "must provide an author's name"],
//         trim: true,
//         maxlength: [20, "name can not be more than 20 characters"],
//       },
//       pages: {
//         type: Number,
//         required: true,
//       },
//       completed: {
//         type: Boolean,
//         default: false,
//       },
//     },
//   ],
// });
