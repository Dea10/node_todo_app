const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: `Choose an option:`,
        choices: [
            { name: `${'1.'.green} New task`, value: '1' },
            { name: `${'2.'.green} Show tasks`, value: '2' },
            { name: `${'3.'.green} Show completed tasks`, value: '3' },
            { name: `${'4.'.green} Show pending tasks`, value: '4' },
            { name: `${'5.'.green} Complete task(s)`, value: '5' },
            { name: `${'6.'.green} Delete task`, value: '6' },
            { name: `${'0.'.green} Bye`, value: '0' }
        ]
    }
]

const showMenu = async () => {
    console.clear();
    console.log('=========================='.green)
    console.log('     Choose an option ')
    console.log('==========================\n'.green)

    const { option } = await inquirer.prompt(questions);

    return option;
}

const showTasksToDelete = async (arrTasks) => {
    const choices = arrTasks.map((task, idx) => {
        const completedDate = new Date(task.completedAt).toDateString();
        return {
            value: task.id,
            name: `${String(idx + 1).green}. ${task.desc} :: ${task.completedAt ? completedDate.green : 'Pending'.red}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancel'.red
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete task: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(question);

    return id
}

const showTasksToComplete = async (arrTasks) => {
    const choices = arrTasks.map((task, idx) => {
        const completedDate = new Date(task.completedAt).toDateString();
        return {
            value: task.id,
            name: `${String(idx + 1).green}. ${task.desc} :: ${task.completedAt ? completedDate.green : 'Pending'.red}`,
            checked: task.completedAt ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Complete task: ',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids
}

const confirmInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue\n`
        }
    ];

    console.log('\n');

    await inquirer.prompt(question);
}

const confirmAction = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'confirmAction',
        message
    }]

    const isConfirmed = await inquirer.prompt(question);
    return isConfirmed;
}

const readInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'input',
            message: 'Set task description: '
        }
    ];

    const { input } = await inquirer.prompt(question);

    return input;
}

module.exports = {
    showMenu,
    confirmInput,
    readInput,
    showTasksToDelete,
    confirmAction,
    showTasksToComplete
}