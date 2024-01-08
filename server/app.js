import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swagger } from './swagger.js';

import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import OrderRoute from './routes/OrderRoute.js';
import CommentRouter from './routes/CommentRoute.js';

const app = express();

const specs = swaggerJSDoc(swagger);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dirname(fileURLToPath(import.meta.url))));

app.get('/test', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/product', ProductRoute);
app.use('/order', OrderRoute);
app.use('/comment', CommentRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
}
);