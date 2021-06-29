import express from 'express';
import { Request, Response, NextFunction } from 'express';

import episodeRoute from './routes/episodes';

interface ResponseError extends Error {
  status?: number;
}

const app = express();

const PORT = 7000;

app.use(episodeRoute);

app.get('/', (req: Request, res: Response) => res.send('Try to get all <a href="/episodes">episodes</a>'));

const getError = (status: number, message: string) => ({ status, message });

app.use((req: Request, res: Response) => {
  res.status(404).send({
    error: getError(404, 'Page is not found')
  })
})

app.use((error: ResponseError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    error: getError(500, 'Internal Server Error')
  });
})

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
