import Task from '../task/task';

export default interface StorageContract {
    getAll(): Array<Task>;

    create(str: any): Task;

    remove(id: any): void;

    done(id: any): void;
}
