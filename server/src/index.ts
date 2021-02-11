import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// This middleware fires when some error occurs in app. Then it checks whether the error is an instance of BaseCustomErrors abstract class and sends an appropriate response.
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://mongodb-srv:27017/users', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB/users');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
