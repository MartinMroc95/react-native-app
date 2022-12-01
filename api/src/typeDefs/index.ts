import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const schema = loadFilesSync('**/typeDefs/**/*.{graphql,gql}')
export default mergeTypeDefs(schema)
