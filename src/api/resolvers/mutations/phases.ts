import DB from '@src/db'
import { Phase, Task } from '@src/models';

type Args = Record<string, any>;

const resolvers =  {
    addPhase: (_: any, { title } : Args, db: DB): Phase => {
        const phase = new Phase(title);

        return db.collection('phases').add(phase);
    },
    removePhase: (_: any, { id } : Args, db: DB): Phase => {
        const phase = db.collection('phases').find(id);

        db.collection('phases').remove(id);

        return phase;
    },
    addTask: (_: any, { phaseID, title } : Args, db: DB): Task => {
        const task = new Task(title);
        const phase = db.collection('phases').find(phaseID);

        if (!phase) return null;

        const previousPhase = db.collection('phases').findByIndex(
            Math.max(0, phase._index - 1)
        );

        if (!previousPhase.isCompleted && previousPhase.id !== phase.id) {
            return null;
        }

        db.collection('phases').update(phaseID, {
            tasks: [ ...phase.tasks, task ],
            isCompleted: false
        });

        return task;
    },
    removeTask: (_: any, { phaseID, taskID } : Args, db: DB): Task => {
        const phase = db.collection('phases').find(phaseID);
        if (!phase) return null;

        const task = phase.tasks.find(task => task.id === taskID);
        const tasks = phase.tasks.filter(task => task.id !== taskID);

        db.collection('phases').update(<string>phaseID, {
            tasks,
            isCompleted: tasks.every(t => t.isCompleted)
        });

        return task;
    },
    markTask: (_: any, { phaseID, taskID, isCompleted } : Args, db: DB): boolean => {
        const phase = db.collection('phases').find(phaseID);
        if (!phase) return false;

        const previousPhase = db.collection('phases').findByIndex(
            Math.max(0, phase._index - 1)
        );

        if (!previousPhase.isCompleted && previousPhase.id !== phase.id) {
            return false;
        }

        const tasks = phase.tasks.map(task => {
            if (task.id === taskID) task.isCompleted = isCompleted;

            return task;
        });

        return db.collection('phases').update(phaseID, {
            tasks,
            isCompleted: tasks.every(t => t.isCompleted)
        });
    },
};

export default resolvers;
