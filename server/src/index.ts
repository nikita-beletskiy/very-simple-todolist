import express from 'express';
import { json } from 'body-parser';

import { errorHandler } from './middleware/error-handler';

import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// This middleware fires when some error occurs in app. Then it checks whether the error is an instance of BaseCustomErrors abstract class and sends an appropriate response.
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
