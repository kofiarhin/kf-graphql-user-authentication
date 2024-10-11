let users = [
  {
    id: "1",
    name: "kofi arhin",
    email: "kofiarhin@gmail.com",
    password: "password",
  },
  {
    id: "2",
    name: "lebron james",
    email: "lebron@gmail.com",
    password: "password",
  },
  {
    id: "3",
    name: "kyrie irving",
    email: "kyrie@gmail.com",
    password: "password",
  },
  {
    id: "4",
    name: "gilbert arena",
    email: "gilbert@gmail.com",
    password: "password",
  },
];

let posts = [
  {
    id: "1",
    user_id: "1",
    title: "some title for post one",
    body: "some text for the body",
  },
  {
    id: "2",
    user_id: "1",
    title: "some title for post two",
    body: "this is a post by user one",
  },
  {
    id: "3",
    user_id: "1",
    title: "some title for post three",
    body: "this is a post by user two",
  },
  {
    id: "4",
    user_id: "1",
    title: "some title for post four",
    body: "this is a post by user three",
  },
];

const db = {
  users,
  posts,
};

export default db;
