import { expect } from 'chai';
import ArrayStorage from '../src/storage/array-storage';

describe('User#save()', function() {
    it('should save without error', function(done) {
        const storage = new ArrayStorage();

        expect(storage.getAll().length).to.equal(3);
        done();
    });
});

