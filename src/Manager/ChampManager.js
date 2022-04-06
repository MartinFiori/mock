import fs from 'fs';
import * as url from 'url';
const __filename = url.fileURLToPath(
    import.meta.url);
const __dirname = url.fileURLToPath(new URL('.',
    import.meta.url));
// const fs = require('fs');
const champPath = __dirname + '/../files/champs.json'

class ChampManager {
    getAllChamps = async () => {
        if (fs.existsSync(champPath)) {
            try {
                const getChamps = await fs.promises.readFile(champPath,'utf-8');
                const champs = JSON.parse(getChamps);
                return {
                    status: "succes",
                    payload: champs
                }
            }catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
    addChamp = async (champ) => {
        if (fs.existsSync(champPath)) {
            try {
                let getChamps = await fs.promises.readFile(champPath, 'utf-8');
                let champs = JSON.parse(getChamps);
                if (champs.length === 0) {
                    champ.id = 1;
                    champs.push(champ);
                    await fs.promises.writeFile(champPath, JSON.stringify(champs, null, 2));
                    return {
                        status: "success",
                        message: "1st champ added"
                    }
                }
                champ.id = champs[champs.length - 1].id + 1;
                champs.push(champ);
                await fs.promises.writeFile(champPath, JSON.stringify(champs, null, 2));
                return {
                    status: "success",
                    message: "1st champ added"
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        } else {
            try {
                champ.id = 1;
                await fs.promises.writeFile(champPath, JSON.stringify([champ], null, 2));
                return {
                    status: "success",
                    message: "Array created!"
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
}

export default ChampManager;