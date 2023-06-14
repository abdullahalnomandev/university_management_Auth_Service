import cors from 'cors';
import express, { Application, Request } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
const app: Application = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoute);

// app.get('/', async (req, res,next) => {

//    throw new Error ("Testing Error logger")
// })

app.use('/api/v1/', routers);
// Global Error Handler
app.all('*', (req: Request) => {
  throw new Error(`Can't find ${req.originalUrl} on this server`);
});

app.use(globalErrorHandler);

export default app;
