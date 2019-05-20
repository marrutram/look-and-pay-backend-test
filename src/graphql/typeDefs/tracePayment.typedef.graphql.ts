export default  `
scalar Date

input ProductInput {
  description: String
  count: String
  total: String
  sku: String
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
  count: String
  total: String
  sku: String
}

type Payments {
  total: String
  products: [Product]
  user: User
  created_at: Date
  updatedAt: Date
}

type Mutation {
  updatePayments(total: String, products: [ProductInput], user: UserInput): Boolean
}

type Query {
  payments: [Payments!]!
}
`;