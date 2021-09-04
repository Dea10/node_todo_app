const Task = require("./task");
require('colors');

class Tasks {
    constructor() {
        this._tasksList = {};
    }

    addTask(desc = 'task description') {
        const newTask = new Task( desc );
        this._tasksList[newTask.id] = newTask;
    }

    loadTasksFromArray( tasks ) { 
        tasks.forEach(task => {
            this._tasksList[task.id] = task;
        });
    }

    showFormattedTasks() {
        this.tasksArr.forEach(( task, idx ) => {
            console.log(`${String(idx+1).green}. ${task.desc} :: ${task.completedAt ? 'Completed'.green : 'Pending'.red}`)
        })
    }

    showPendingCompletedTasks( completed = true ) {
        if(completed) {
            this.tasksArr.filter( task => task.completedAt !== null ).forEach( (task, idx) => {
                const completedDate = new Date(task.completedAt).toDateString();
                console.log(`${String(idx+1).green}. ${task.desc} :: ${task.completedAt ? completedDate.green : 'Pending'.red}`)
            })
            return ;
        }

        this.tasksArr.filter( task => !task.completedAt ).forEach( (task, idx) => {
            console.log(`${String(idx+1).red}. ${task.desc} :: ${task.completedAt ? 'Completed'.green : 'Pending'.red}`)
        })
    }

    deleteTask(id = '') {
        delete this._tasksList[id];
    }

    completeTask(id) {
        this._tasksList[id].completedAt = Date.now();
    }

    setAsIncomplete(id) {
        this._tasksList[id].completedAt = null;
    }

    get tasksList() { return this._tasksList; }
    get tasksArr() { return Object.values(this.tasksList); }
}

module.exports = Tasks;
