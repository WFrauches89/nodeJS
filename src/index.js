import fs from 'fs';
import chalk from "chalk";
import { exec } from 'child_process';

function extractLinks (text) {
    const regex = /\[([^[\]]*?)\]\((https?:[^\s?#.].[^\s]*)\)/gm;
    const capturs = [...text.matchAll(regex)];
    const results = capturs.map(captur => ({[captur[1]]:captur[2]}))
   
    return results.length !== 0 ? results : chalk.red('Não há links no arquivo');
}

// [
//     {title[1]: URL[2]}
// ]



function dealWith(error) {
    console.log(error);
    throw new Error (chalk.red(error.code, 'Não há arquivo neste DIR'));
};

    // Modo async/await assíncrono 02
    // Em termos de performance são similares o .then tem uma forma mais funcional de escrita enquanto o async/await tem um modo de escrita muito similar com o escrita com o código síncrono, podem ser utilizado em conjunto.

async function extractArq (localData) {
    try {
        const enconding = 'utf-8';
        const text = await fs.promises.readFile(localData,enconding)
        
        return extractLinks(text);
        
    }   catch (error) {
        dealWith(error)
    }  finally {
        console.log(chalk.bgCyanBright('Operação finalizada!'));
    }

}

    // Modo .then .catch assíncrono 01
// function extractArq(localData) {
//     const enconding = 'utf-8';
//     fs.promises.readFile(localData, enconding)
//         .then((text) => console.log(chalk.green(text)))
//         // .catch((error) => dealWith(error))
//         .catch(dealWith)
// }
    // Modo síncrono não é usado para este tipo de ação pois não envolve PROMISES
// function extractArq (localData) {
//     const enconding = 'utf-8';
//     fs.readFile(localData, enconding, (error, text) => {
//         if (error) {
//             dealWith(error);
//         }
//         console.log(chalk.green(text))
//     });

// };

export default extractArq;




