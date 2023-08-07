import chalk from "chalk";

function extractLink (arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

function manerErr (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    } else {
        return 'Ocorreu algum erro';
    }
}

async function checkStatsURL (listURLs) {
    const arrStatus = await Promise.all(
        listURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return `${response.status}-${response.statusText}`;
            } catch (erro) {
                return manerErr (erro);
            }
    
        })
    )
    return arrStatus;
}

export default async function listVal (argumento) {
    const links = extractLink(argumento);
    const status = await checkStatsURL(links);

    return argumento.map((objc, i) => ({
        ...objc,
        stats: status[i]
    }))
}


// Resumidamente, uma url pode ser quebrada então no seguinte formato:

// [esquema]://[servidor]:[porta]/[caminho]?[querystring]#[fragmento]
