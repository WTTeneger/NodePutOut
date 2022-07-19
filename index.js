import express from 'express'
import router from "./router.js";
import appRouter from "./app/urls.js";
import apiRouter from "./API/urls.js";
import adminRouter from "./admin/urls.js";
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
import { _404_page } from "./views.js";
import os from 'os';
var ifaces = os.networkInterfaces();
try {

    var local_addr = (ifaces.en0[1].address);
} catch (e) {
    var local_addr = 'localhost';
}
// console.log(ifaces['']);

const PORT = 80;
const HOSTNAME = '0.0.0.0';
// const HOSTNAME = '172.16.16.5';
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
app.use('/admin', adminRouter)

app.get('*', function (req, res) {
    _404_page(req, res)
});




let db = mongoose.connect('mongodb://127.0.0.1:27017/test-db');
// Create your Forest Admin agent
async function startApp() {
    try {
        // await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, HOSTNAME, () => console.log('Restart server\n start in port ' + PORT))
        reload(app)
    } catch (e) {
        console.log(e)
    }
}

startApp()
