import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

//importar las rutas
import auth from './routes/auth.routes.js'
import maestro from './routes/maestro.routes.js'
import admin from './routes/admin.routes.js'


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth',auth);
app.use('/api/maestro',maestro);
app.use('/api/admin',auth,admin);


export default app;