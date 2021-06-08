import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import "express-async-errors";

import UserController from './controller/UserController';
import EnrollController from './controller/EnrollController';
import CourseController from './controller/CourseController';
import AppError from './errors/AppError';

const app = express();

app.use(cors())
app.use(express.json());

const userController = new UserController();
const courseController = new CourseController();
const enrollController = new EnrollController();

app.get('/users', userController.list);
app.get('/users/:id', userController.show)
app.post('/users', userController.create)
app.put('/users/:id', userController.update)
app.delete('/users/:id', userController.delete)

app.get('/enrolls/export/:exportType', enrollController.export)
app.get('/enrolls', enrollController.list)
app.get('/enrolls/:id', enrollController.show)
app.post('/enrolls', enrollController.create)
app.put('/enrolls/:id', enrollController.update)
app.delete('/enrolls/:id', enrollController.delete)

app.get('/courses', courseController.list)
app.get('/courses/:id', courseController.show)
app.post('/courses', courseController.create)
app.put('/courses/:id', courseController.update)
app.delete('/courses/:id', courseController.delete)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('🚀 Server ready at: http://localhost:3333'));