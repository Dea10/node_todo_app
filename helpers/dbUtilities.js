const fs = require('fs');

const filePath = './db/data.json';

const saveTasks = data => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

const readTasks = () => {
    const data = fs.readFileSync(filePath);
    const tasks = JSON.parse(data, { encoding: 'utf-8' });
    console.log(tasks);
    return tasks;
}

module.exports = {
    saveTasks,
    readTasks
}