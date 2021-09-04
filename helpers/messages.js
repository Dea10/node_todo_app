require('colors');

const showMenu = () => {
    console.clear();
    console.log('=========================='.green)
    console.log('     Choose an option ')
    console.log('==========================\n'.green)

    console.log(`${'1.'.green} New task`);
    console.log(`${'2.'.green} Show tasks`);
    console.log(`${'3.'.green} Show completed tasks`);
    console.log(`${'4.'.green} Show pending tasks`);
    console.log(`${'5.'.green} Complete task(s)`);
    console.log(`${'6.'.green} Delete task`);
    console.log(`${'0.'.green} Exit!\n`);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Choose an option: ', opt => {
        console.log({ opt })
        readline.close();
    });
}

module.exports = {
    showMenu
}