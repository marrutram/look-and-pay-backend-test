export default  `
scalar Date

input ProductInput {
  description: String
  count: Int
  picture: String
  balance: String
  unit: String
}

input UserInput {
  name: String
  email: String
  lastnanme: String
  rut: String
  urlImagen: String
}

type Product {
  description: String
  count: Int
  picture: String
  balance: String
  unit: String
}

type Payment {
  balance: String
  user: User
  products: [Product]
}

type Mutation {
  createPayment(balance: String, userImage: String, products: [ProductInput] ): Boolean
}

type Query {
  payments: [Payment!]!
}
`;