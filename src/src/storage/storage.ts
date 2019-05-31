import CookieManager from '../cookie-manager';
import ArrayStorage from './array-storage';
import CookieStorage from './cookie-storage';
import StorageContract from './storage-contract';

export default function getStorage(storage: any): StorageContract {
    switch (storage.type) {
        case 'array':
            return new ArrayStorage();
        case 'cookie':
            return new CookieStorage(new CookieManager(storage.expires));
        default:
            throw new Error('Storage does not support this type.');
    }
};
