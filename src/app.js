import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import { createRoles } from "./libs/initialSetup";

import productsRoutes from './routes/products.routes';
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";

// use methods libs
const app = express();
createRoles(); // creo los roles automaticamente

// Settings
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;