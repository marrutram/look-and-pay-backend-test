export default  `
scalar Date

input ImageInput {
  name: String
}

type Image {
  name: String!
  created_at: Date,
  updatedAt: Date
}

type User {
  name: String,
  email: String!
  images: [Image],
  created_at: Date,
  updatedAt: Date
}

type Mutation {
  updateUser(email: String!, name: String, images: [ImageInput]): Boolean
}

type Query {
  users: [User!]!
}
`;