import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler } from './middleware/error-handler';
import { getCurrentUser } from './middleware/get-current-user';
import { NotFoundError } from './errors/not-found-error';
import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { addNewTodoRouter } from './routes/todos/add-new-todo';
import { getTodosRouter } from './routes/todos/get-todos';
import { deleteTodoRouter } from './routes/todos/delete-todo';
import { updateTodoRouter } from './routes/todos/update-todo';

const app = express();
// Traffic to app is beeing proxied by ingress nginx, so as we require in cookieSession that cookies will only be used over https, we set express to trust traffic coming from that proxy
app.set('trust proxy', true);
// Encryption for cookie is disabled because it is going to store a JWT, and it's already encrypted
app.use(cookieSession({ signed: false, secure: false })); // Send cookie over HTTP for testing in production
app.use(express.json());
app.use(getCurrentUser);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(addNewTodoRouter);
app.use(getTodosRouter);
app.use(deleteTodoRouter);
app.use(updateTodoRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// This middleware fires when some error occurs in app. Then it checks whether the error is an instance of BaseCustomErrors abstract class and sends an appropriate response.
app.use(errorHandler);

const start = async () => {
  console.log('Starting Server...');

  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
