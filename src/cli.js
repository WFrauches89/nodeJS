#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import extractArq from './index.js';
import listVal from './htt-valida.js';


const path = process.argv;

async function printList (valid, result, id = '') {
    if (valid) {
        console.log(chalk.yellow('Lista válida de links: '), 
        chalk.black.bgGreen(id),
        await listVal(result));

    } else {
        console.log(chalk.yellow('Lista válida de links: '), 
        chalk.black.bgGreen(id),
        result);
    }
}

async function textProcess (argv) {
    const path = argv[2];
    const valida = argv[3] === '--valida';

    try {
        fs.lstatSync(path);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou Diretório não existe!'))
            return;
        }
    }

    if (fs.lstatSync(path).isFile()){
        const result = await extractArq(path);
        printList(valida, result)
    } else if(fs.lstatSync(path).isDirectory()){
        const arqs = await fs.promises.readdir(path)
        arqs.forEach(async(nameArq) => {
            const list = await extractArq(`${path}/${nameArq}`)
            printList(valida, list, nameArq);
        })
   
    }

}

textProcess(path);
