import express from 'express';
import cors from 'cors';

import AuthRoute from './routes/AuthRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send('Hello World!');
    }
);

app.use('/auth', AuthRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    }
);