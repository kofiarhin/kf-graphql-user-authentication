const typeDefs = `#graphql

type User {
    _id: ID
    name: String
    email: String
    password: String
    posts: [Post]
}

type Post { 
    _id: ID,
    title: String
    body: String,
    user_id: String
    user: User
}

type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
}

type Mutation {
    createUser(userInput: UserInput): User
    updateUser(id: ID!, updateUserInput: UpdateUserInput) : User
    deleteUser(id: ID!): User
    createPost(postInput: PostInput): Post
    deletePost(id: ID!): Post
    updatePost(id: ID!, updatePostInput: UpdatePostInput): Post
}

input UpdatePostInput {
    title: String
    body: String
}

input PostInput {
    title: String
    body: String
    user_id: String
}

input UpdateUserInput {
    name: String
    email: String
    password: String
}

input UserInput {
    name: String
    email: String
    password: String
}
`;

export default typeDefs;
