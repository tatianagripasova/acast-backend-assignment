import express from 'express';
import { Request, Response, NextFunction } from 'express';

import episodeRoute from './routes/episode';

interface ResponseError extends Error {
  status?: number;
}

const app = express();

const PORT = 7000;

app.use(episodeRoute);

app.get('/', (req, res) => res.send('My tiny Express App bla bla bla'));

app.use((req: Request, res: Response) => {
  res.status(404).send({
    error: {
      status: 404,
      message: 'Page is not found'
    }
  })
})

app.use((error: ResponseError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
   },
  });
})

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
