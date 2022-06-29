import { v4 as uuidv4 } from 'uuid';

class Task {
    public readonly id: string;
    public title: string;
    public isCompleted: boolean;
    public createdAt: Date;

    constructor(title: string, isCompleted = false) {
        this.id = uuidv4();
        this.title = title;
        this.isCompleted = isCompleted;
        this.createdAt = new Date();
    }
};

export default Task;
