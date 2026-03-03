import mongoose from 'mongoose';
const { Schema } = mongoose;

// const UserSchema = new Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('User', UserSchema); // ✅ export model langsung



const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,    
  },
  {
    timestamps: true,
  }
);

export default UserSchema;