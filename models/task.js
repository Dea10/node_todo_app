const { v4: uuidv4 } = require('uuid');
require('colors');

class Task {
    constructor(desc = 'task description') {
        this.id = uuidv4();
        this.desc = desc;
        this.createdAt = Date.now();
        this.completedAt = null;
    }
}

module.exports = Task;
