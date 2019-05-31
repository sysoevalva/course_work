import Task from './task';

export default class TaskCollection {

    constructor(private tasks: Array<Task>) {}

    getTasks(): Array<Task> {
        return this.tasks;
    }

    getAllTasksCount(): number {
        return this.tasks.length;
    }

    getDoneTasksCount(): number {
        return this.tasks.filter(task => task.state === 'done').length;
    }
}
