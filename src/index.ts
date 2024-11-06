import express, { Application, NextFunction, Request, Response } from 'express';
import { urlencoded } from 'body-parser';
import routes from './routes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173", credentials: true, }));
// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
