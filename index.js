import express from 'express'
import router from "./router.js";
import appRouter from "./app/urls.js";
import ejq from 'ejs'

import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = 5000;
// const DB_URL = 'mongodb+srv://root:pass@nodejsdb.ngo1hlm.mongodb.net/?retryWrites=true&w=majority';

const app = express()
console.log(__dirname)

app.use(express.static(__dirname + '/assets'));
app.engine('html', ejq.renderFile);
app.use(express.json())
app.set('view engine', 'ejs');

app.set('views', __dirname + '/templates');
app.use('/', router)
app.use('/app', appRouter)

async function startApp() {
    try {
        // await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Restart server'))
    } catch (e) {
        console.log(e)
    }
}

startApp()