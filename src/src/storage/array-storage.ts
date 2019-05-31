import Task from '../task/task';
import StorageContract from './storage-contract';

let TASKS: any = null;

export default class ArrayStorage implements StorageContract {
    protected tasks: Array<Task>;

    constructor() {
        this.tasks = [];
    }

    getAll(): Array<Task> {
        if (null === TASKS) {
            TASKS = [
                new Task(this.doId(), 'Задача 1', 'current'),
                new Task(this.doId(), 'Задача 2', 'current'),
                new Task(this.doId(), 'Задача 3', 'done')
            ];

            this.tasks = TASKS;
        }

        return this.tasks;
    }

    doId(): string {
        return Math.random().toString(36).substr(2, 16);
    }

    create(str: any): Task {
        const task = new Task(this.doId(), str, 'current');
        this.tasks.push(task);

        return task;
    }

    remove(id: any): void {
        for (const [index, item] of this.tasks.entries()) {
            if (item.id !== id) {
                continue;
            }

            this.tasks.splice(index, 1);
        }
    }

    done(id: any): void {
        for (const [index, item] of this.tasks.entries()) {
            if (item.id !== id) {
                continue;
            }

            item.state = item.state === 'current' ? 'done' : 'current';
        }
    }
}
