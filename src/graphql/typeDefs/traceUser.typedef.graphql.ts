export default  `
scalar Date

type User {
  name: String
  email: String
  lastnanme: String
  rut: String
  urlImagen: String
  created_at: Date
  updatedAt: Date
}

type Mutation {
  updateUser(email: String, name: String, lastnanme: String, rut: String, urlImagen: String): Boolean,
  signup(email: String, name: String, lastnanme: String, rut: String, urlImagen: String, password: String):String,
  login(email: String, password: String ): String
}

type Query {
  users: [User!]!
}
`;
