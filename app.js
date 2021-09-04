require('colors');
const fs = require('fs');

const { saveTasks, readTasks } = require('./helpers/dbUtilities');
const {
    showMenu,
    confirmInput,
    readInput,
    showTasksToDelete,
    confirmAction,
    showTasksToComplete
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {
    const dbFilePath = './db/data.json';
    const tasks = new Tasks();
    let opt = '0';

    if (fs.existsSync(dbFilePath)) {
        const dbTasks = readTasks();
        tasks.loadTasksFromArray(dbTasks);
    }

    do {
        opt = await showMenu();

        switch (opt) {
            case '1':
                // add task
                const taskDescription = await readInput()
                tasks.addTask(taskDescription);
                break;
            case '2':
                // list tasks
                console.log('\n');
                tasks.showFormattedTasks();
                break;
            case '3':
                // show completed tasks
                console.log('\n');
                tasks.showPendingCompletedTasks();
                break;
            case '4':
                // show pending tasks
                console.log('\n');
                tasks.showPendingCompletedTasks(false);
                break;
            case '5':
                console.log('\n');
                const ids = await showTasksToComplete(tasks.tasksArr);
                ids.forEach(id => { tasks.completeTask(id) })

                const incompleteTasksIds = tasks.tasksArr
                                                .filter(task => !ids.includes(task.id))
                                                .map(task => {
                                                    return task.id;
                                                });

                incompleteTasksIds.forEach(id => {
                    tasks.setAsIncomplete(id);
                });
                break;
            case '6':
                console.log('\n');
                const id = await showTasksToDelete(tasks.tasksArr);
                if(id !== '0') {
                    const isConfirmed = await confirmAction('Confirm delete?');
                    if(isConfirmed) {
                        tasks.deleteTask(id);
                        console.log('Task deleted!'.yellow);
                    }
                }
            default:
                break;
        }

        saveTasks(tasks.tasksArr);

        if (opt !== '0') await confirmInput();
    } while (opt !== '0');
}

main();
