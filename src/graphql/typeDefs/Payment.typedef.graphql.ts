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
  lastname: String
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
  supermarket: String
  electronicBill: String
  user: User
  date: String
  hour: String
  products: [Product]
}

type Mutation {
  createPayment(
    balance: String!, 
    userImage: String!, 
    supermarket: String!,
    electronicBill: String!,
    date: String,
    hour: String, 
    products: [ProductInput] ): UserResult 
}

type Query {
  payments: [Payment!]!
}
`;