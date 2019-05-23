export default  `
scalar Date

type User {
  name: String
  email: String
  lastname: String
  rut: String
  urlImagen: String
  nameCard: String
  numberCard: String
  expDateCard: String
  created_at: Date
  updatedAt: Date
}

type UserResult {
  name: String
  email: String
  lastname: String
  token: String
}

type Mutation {
  signup(email: String!, name: String!, lastname: String, rut: String, urlImagen: String!, password: String!, nameCard: String, numberCard: String, expDateCard: String): UserResult,
  login(email: String, password: String ): UserResult
}

type Query {
  users: [User!]!
  myInfo: User
}
`;
