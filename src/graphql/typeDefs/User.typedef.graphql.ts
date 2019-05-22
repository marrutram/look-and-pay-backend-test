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

type Mutation {
  signup(email: String!, name: String!, lastname: String, rut: String, urlImagen: String!, password: String!, nameCard: String, numberCard: String, expDateCard: String):String,
  login(email: String, password: String ): String
}

type Query {
  users: [User!]!
}
`;
