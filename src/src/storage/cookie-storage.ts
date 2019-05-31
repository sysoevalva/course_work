import ArrayStorage from './array-storage';
import CookieManager from '../cookie-manager';
import Task from '../task/task';

let TASKS: any = null;

export default class CookieStorage extends ArrayStorage {
    constructor(private cookieManager: CookieManager) {
        super();
    }

    getAll(): Array<Task> {
        if (null === TASKS) {
            TASKS = this.cookieManager.hasCookie('tasks') ? JSON.parse(this.cookieManager.getCookie('tasks')) : [];
            this.tasks = TASKS;
        }

        return this.tasks;
    }

    create(str: any): Task {
        let task = super.create(str);
        this.updateCookie();

        return task;
    }

    remove(id: any): void {
        super.remove(id);
        this.updateCookie();
    }

    done(id: any): void {
        super.done(id);
        this.updateCookie();
    }

    updateCookie(): void {
        this.cookieManager.setCookie('tasks', JSON.stringify(this.tasks), {path: '/'});
    }
}
