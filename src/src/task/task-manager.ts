import Task from './task';
import TaskCollection from './task-collection';
import StorageContract from '../storage/storage-contract';
import TaskDomInterface from './task-dom-interface';

export default class TaskManager {

    private tasksListDomEl: HTMLElement;
    private allTasksDomEl: HTMLElement;
    private doneTasksDomEl: HTMLElement;
    private tasks: Array<Task>;
    private storage: StorageContract;
    private taskCollection: TaskCollection;

    constructor(taskDomElements: TaskDomInterface, storage: StorageContract) {
        this.tasksListDomEl = taskDomElements.appList;
        this.allTasksDomEl = taskDomElements.all;
        this.doneTasksDomEl = taskDomElements.done;
        this.tasks = [];
        this.storage = storage;
    }

    setTaskCollection(taskCollection: TaskCollection): void {
        this.tasks = taskCollection.getTasks();
        this.taskCollection = taskCollection;
    }

    createItem(el: Task): void {
        let self = this;

        let item = document.createElement('li');
        let remove = document.createElement('div');
        let text = document.createElement('span');

        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function () {
            self.removeTask(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            self.doneTask(this);
        });

        switch (el.state) {
            case 'done':
                item.classList.add('app__list-item', 'app__list-item--done');
                break;
            default:
                item.classList.add('app__list-item');
        }

        item.id = el.id;
        text.innerHTML = el.content;
        item.appendChild(text);
        item.appendChild(remove);
        this.tasksListDomEl.appendChild(item);
    }

    doneTask(el: HTMLElement): void {
        let elem = (el.parentNode as Element);
        let elemId = elem.id;

        elem.classList.toggle('app__list-item--done');

        this.storage.done(elemId);
        
        this.doneTasksDomEl.innerHTML = String(this.taskCollection.getDoneTasksCount());
    }

    removeTask(el: HTMLElement) {
        let removeEl = (el.parentNode as Element);
        let removeElId = removeEl.id;
    
        removeEl.remove();

        this.storage.remove(removeElId);

        this.allTasksDomEl.innerHTML = String(this.taskCollection.getAllTasksCount());
        this.doneTasksDomEl.innerHTML = String(this.taskCollection.getDoneTasksCount());
    }

    addTask(str: any): void {
        this.createItem(this.storage.create(str));

        this.allTasksDomEl.innerHTML = String(this.taskCollection.getAllTasksCount());
    }
}
