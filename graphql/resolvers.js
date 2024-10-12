import db from "../data/_db.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },

    posts: async (_, args) => {
      const posts = await Post.find();
      return posts;
    },
    post: async (_, { id }) => {
      // 649d7618f1e7cc1df28dbf1b
      const foundPost = await Post.findOne({ _id: id });
      return foundPost;
    },
  },
  Mutation: {
    createUser: async (_, { userInput: { name, email, password } }) => {
      // generate salt
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },

    updateUser: async (_, { id, updateUserInput }) => {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateUserInput,
          },
        },
        { new: true }
      );
      return user;
    },

    createPost: async (_, { postInput: { title, body, user_id } }) => {
      const newPost = await Post.create({
        title,
        body,
        user_id,
      });

      return newPost;
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findByIdAndDelete(id);
      return post;
    },

    updatePost: async (_, { id, updatePostInput }) => {
      const post = await Post.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updatePostInput,
          },
        },
        { new: true }
      );
      console.log("xxxx", post);
      return post;
    },
  },

  Post: {
    user: async (parent) => {
      const userId = parent.user_id;
      const res = await User.findOne({ _id: parent.user_id });
      return res;
    },
  },

  User: {
    posts: async (parent) => {
      const res = await Post.find({ user_id: parent._id });
      return res;
    },
  },
};
export default resolvers;
