import { v4 as uuidv4 } from 'uuid';

import Task from './task.model';

class Phase {
    public readonly _index?: number;
    public readonly id: string;
    public createdAt: Date;
    public title: string;
    public tasks: Array<Task>;
    public isCompleted: boolean;

    constructor(title: string, isCompleted = true) {
        this.id = uuidv4();
        this.title = title;
        this.tasks = [];
        this.createdAt = new Date();
        this.isCompleted = isCompleted;
    }
};

export default Phase;
