import { GraphQLScalarType, Kind } from 'graphql';

import queryResolvers from './queries';
import mutationResolvers from './mutations';

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(date: Date) {
        return date.getTime();
    },
    parseValue(time: number) {
        return new Date(time);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) return new Date(parseInt(ast.value, 10));

        return null; // invalid value (not an integer)
    }
});

export default {
    Date: dateScalar,
    Query: { ...queryResolvers },
    Mutation: { ...mutationResolvers }
};
