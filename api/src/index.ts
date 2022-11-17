import { ApolloServer } from 'apollo-server'

const typeDefs = `
  type Query {
    info: String!
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_: any, args: { name: string }) => `Hello ${args.name || 'World!'}`,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const port = 5000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
