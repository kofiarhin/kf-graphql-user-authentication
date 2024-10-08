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
    user: (_, { id }) => {
      const foundUser = db.users.find((user) => user.id === id);
      return foundUser;
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
      // delete this code
      await User.deleteMany({});

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
    deleteUser: (_, { id }) => {
      const res = db.users.filter((user) => user.id !== id);
      return res;
    },

    updateUser: (_, { id, updateUserInput }) => {
      const res = db.users.map((user) => {
        if (user.id === id) {
          return { ...user, ...updateUserInput };
        }
        return user;
      });

      db.users = res;
      const foundUser = db.users.find((user) => user.id === id);
      return foundUser;
    },

    createPost: (_, { postInput: { title, body, user_id } }) => {
      const newPost = {
        title,
        body,
        user_id,
        id: Math.floor(Math.random() * 10000),
      };
      db.posts.push(newPost);

      return newPost;
    },
    deletePost: (_, { id }) => {
      const res = db.posts.filter((post) => post.id !== id);
      return res;
    },

    updatePost: (_, { id, updatePostInput }) => {
      const res = db.posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            ...updatePostInput,
          };
        }
        return post;
      });
      db.posts = res;
      return db.posts;
    },
  },

  Post: {
    user: async (parent) => {
      // const res = db.users.find((user) => user.id === parent.user_id);
      const userId = parent.user_id;

      const res = await User.findOne({ _id: parent.user_id });
      return res;
    },
  },

  User: {
    posts: (parent) => {
      const res = db.posts.filter((post) => post.user_id === parent.id);
      return res;
    },
  },
};
export default resolvers;
