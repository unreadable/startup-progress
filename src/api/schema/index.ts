import { gql } from 'apollo-server';

const schema = gql`
    scalar Date

    type Task {
        id: ID!
        title: String!
        isCompleted: Boolean!
        createdAt: Date!
    }

    type Phase {
        _index: Int
        id: ID!
        title: String!
        tasks: [Task]!
        createdAt: Date!
        isCompleted: Boolean!
    }

    type Query {
        phases: [Phase]
        phase(id: ID!): Phase
    }

    type Mutation {
        addPhase(title: String!): Phase
        removePhase(id: ID!): Phase
        addTask(phaseID: ID!, title:String): Task
        removeTask(phaseID: ID!, taskID: ID!): Task
        markTask(phaseID: ID!, taskID: ID!, isCompleted: Boolean): Boolean 
    }
`;

export default schema;
