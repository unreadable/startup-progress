import * as fs from 'fs';
import * as path from 'path';

import { Phase } from '@src/models/';

class DB {
    private phases: Array<Phase>;
    private repository: Array<Phase>;

    constructor() {
        this.phases = require(
            path.join(process.cwd(), 
            process.env.DB_FILE)
        );
        this.repository = this.phases;
    }

    private save() {
        fs.writeFile(
            process.env.DB_FILE,
            JSON.stringify(this.repository, null, 4),
            err => { if (err) throw err; }
        );
    }

    public collection(name: string) {
        if (name === 'phases') this.repository = this.phases;
        else throw new Error('Collection does not exist!')

        return this;
    }

    public find(id: string) {
        return this.repository.find(rec => rec.id === id);
    }

    public findByIndex(index: number) {
        return this.repository[index];
    }

    public findAll() {
        return this.repository.slice();
    }

    public add(record: Phase): Phase {
        const phase = Object.assign(record, { _index: this.repository.length });

        this.repository.push(phase);
        this.save();

        return phase;
    }

    public update(id: string, record: object): boolean {
        const index = this.repository.findIndex(rec => rec.id === id);

        if (index < 0) return false;
        
        Object.assign(this.repository[index], record);
        this.save();

        return true;
    }

    public remove(id: string) {
        const newRepository = this.repository.filter(rec => rec.id !== id);
        this.repository = newRepository;
        this.save();
    }

    public count() {
        return this.repository.length;
    }
}

export default DB;
