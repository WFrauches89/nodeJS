import chalk from 'chalk';
import extractArq from './index.js';

const path = process.argv;

async function textProcess () {
    const result = await extractArq(path[2]);
    console.log(chalk.yellow('Lista de links: '), result);
}

textProcess(path);
