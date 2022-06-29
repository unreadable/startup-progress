import DB from '@src/db'
import { Phase } from '@src/models';

type Args = Record<string, string>;

const resolvers =  {
    phases: (_: any, __: any, db: DB): Phase[] => db.collection('phases').findAll(),
    phase: (_: any, { id } : Args, db: DB): Phase => db.collection('phases').find(id)
};

export default resolvers;
