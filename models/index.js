import mongoose from "mongoose";

import UserSchema from "./schemas/user.js";
import PostSchema from "./schemas/board.js";

export const Post = mongoose.model("Post", PostSchema);
export const User = mongoose.model("User", UserSchema);