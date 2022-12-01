import { Book, QueryBooksByTitleArgs, Resolvers } from 'generated/generated-types'

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

export const resolvers: Resolvers = {
  Query: {
    allBooks: (): Book[] => books,
    booksByTitle: (_, { title }: QueryBooksByTitleArgs) => {
      return books.filter((book) => book.title === title)
    },
  },
}
