import db from "../data/_db.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getUsesrs = async () => {
  const users = await User.find();
  return users;
};

// delete  users
const deleteUsers = async () => {
  await User.deleteMany();
};

// delete poasts
const deletePosts = async () => {
  await Post.deleteMany();
};

// clear database
const clearDatabase = async () => {
  // delete users
  await deleteUsers();
  // delete posts
  await deletePosts();
};

// create users
const createUsers = async () => {
  const { users } = db;
  const updatedUsers = await Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  // save users in database
  updatedUsers.map(async (user) => {
    await User.create(user);
  });
};

// create Posts
const createPosts = async (users) => {
  const { posts } = db;
  posts.map(async (post) => {
    const randomPosition = Math.floor(Math.random() * users.length);
    await Post.create({
      ...post,
      user_id: users[randomPosition]._id,
    });
  });
};

// get posts
const getPosts = async () => {
  return Post.find();
};

// reset
const reset = async () => {
  //   clear database
  await clearDatabase();
  //   create users
  await createUsers();
  const foundUsers = await getUsesrs();
  if (foundUsers.length > 0) {
    await createPosts(foundUsers);
    const foundPosts = await getPosts();
  }
};

export default reset;
