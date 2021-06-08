import { Request, Response } from "express";

import Course from '../model/Course';
import AppError from '../errors/AppError';
import CourseDAO from '../daos/implementations/CourseDAO';

const courseDAO = new CourseDAO()

class CourseController {
  async list(req: Request, res: Response) {
    const courses = await courseDAO.list()

    res.json(courses)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const course = await courseDAO.index(+id)
  
    res.json(course)
  }

  async create(req: Request, res: Response) {
    const { name, duration, teacher } = req.body;

    if (duration < 40) {
      throw new AppError('O curso deve ter no minimo 40 horas.')
    }

    const course = new Course()

    Object.assign(course, {
      name, 
      teacher,
      duration, 
    })

    await courseDAO.create(course)
    return res.status(201).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, duration, teacher } = req.body;

    if (duration < 40) {
      throw new AppError('O curso deve ter no minimo 40 horas.')
    }

    const course = new Course()

    Object.assign(course, {
      id: +id,
      name, 
      teacher,
      duration, 
    })

    await courseDAO.update(course)
    return res.status(201).send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await courseDAO.delete(+id)
    return res.status(204).send()
  }

}

export default CourseController;