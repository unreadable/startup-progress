import DB from '@src/db';

import typeDefs from './schema';
import resolvers from './resolvers';

import { ApolloServer } from 'apollo-server-express';

export default new ApolloServer({
    typeDefs, resolvers,
    context: new DB(),
    csrfPrevention: true,
});
