import express from 'express'
import router from "./router.js";
import appRouter from "./app/urls.js";
import apiRouter from "./API/urls.js";
// import adminRouter from "./admin/urls.js";
import ejq from 'ejs'
import { createAgent } from '@forestadmin/agent';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from '@forestadmin/datasource-mongoose';
const { createSequelizeDataSource } = pkg;
import mongoose from 'mongoose';
import { createMongooseDataSource } from '@forestadmin/datasource-mongoose';
import reload from 'reload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import logger from './middleware/logger.js'

const PORT = 8000;
// const DB_URL = 'mongodb+srv://root:pass@nodejsdb.ngo1hlm.mongodb.net/?retryWrites=true&w=majority';

const app = express()
app.use(express.static(__dirname + '/assets'));
app.engine('html', ejq.renderFile);
app.use(express.json())
app.set('view engine', 'ejs');

app.set('views', __dirname + '/templates');
app.use('/', router)
app.use('/app', appRouter)
app.use('/api', apiRouter)


let db = mongoose.connect('mongodb://127.0.0.1:27017/test-db');
// Create your Forest Admin agent

async function startApp() {
    try {
        // await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Restart server'))
        reload(app)
    } catch (e) {
        console.log(e)
    }
}

startApp()
