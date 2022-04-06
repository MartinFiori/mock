import express from 'express';
import moment from 'moment';
import ChampManager from './Manager/ChampManager.js';
import {
    normalize,
    schema
} from 'normalizr';
import {
    Server
} from 'socket.io';
import * as url from 'url';
const __filename = url.fileURLToPath(
    import.meta.url);
const __dirname = url.fileURLToPath(new URL('.',
    import.meta.url));
const champService = new ChampManager();


const app = express();
app.use(express.static(__dirname + '/public'))
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);

const log = [];
const generalLog = {
    id: "200",
    name: "General chat",
    log: log
}
io.on('connection', async socket => {
    console.log("conectado");
    let champs = await champService.getAllChamps();
    io.emit('champLog', champs)
    socket.emit("chatLog", log);
    // socket.on('message', data => {
    //     console.log(data);
    //     io.emit("chatLog", log)
    // })
    socket.on('sentChamp', async (data) => {
        await champService.addChamp(data)
        let champs = await champService.getAllChamps();
        io.emit('champLog', champs);
    })
    socket.on('userInfo', (data) => {
        data.time = moment().format("HH:mm:ss DD/MM/YYYY")
        // console.log(data)
        log.push(data)
        console.log(JSON.stringify(normalizedData, null, '\t'));
    })
})


const author = new schema.Entity('author')
const chatSchema = new schema.Entity('chat', {
    author: author,
    messages: [author]
});

const normalizedData = normalize(generalLog, chatSchema)