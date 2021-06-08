import { getYear, parseISO } from 'date-fns';
import { Request, Response } from "express";

import Csv from '../stratagy/Csv';
import AppError from '../errors/AppError';
import ExportFile from '../stratagy/ExportFile';
import createRandomRa from '../utils/createRandomRa';
import EnrollDAO from '../daos/implementations/EnrollDAO';
import firstLetterUpperCase from '../utils/firstLetterUpperCase';

enum Status {
  locked = "Trancado",
  studying = "Cursando",
  finished = "Concluido",
}

const enrollDAO = new EnrollDAO()

class EnrollController {
  async export(req: Request, res: Response) {
    const { exportType } = req.params
    const enrolls = await enrollDAO.list() 
    const exportTypes = {
      csv: new Csv(),
    } as any

    const exportFile = new ExportFile(exportTypes[exportType])

    const formattedData = enrolls.map((enroll: any) => ({
      id: enroll.id,
      userRa: enroll.user.ra,
      userName: enroll.user.name,
      courseName: enroll.course.name,
      courseTeacher: enroll.course.teacher,
      status: Status[(enroll.status as keyof typeof Status)],
    }))

  
    const file = await exportFile.exportFile(formattedData)
    res.download(file)
  }

  async list(req: Request, res: Response) {
    const enrolls = await enrollDAO.list()
  
    res.json(enrolls)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const enroll = await enrollDAO.index(+id);
  
    res.json(enroll);
  }

  async create(req: Request, res: Response) {
    const { user, courseId } = req.body;
    
    const currentYear = new Date().getFullYear();

    const age = currentYear - getYear(parseISO(user.born));

    if (firstLetterUpperCase(user.address.country) !== 'Brasil') {
      throw new AppError('É obrigatorio que o usuario more no Brasil.');
    }

    if (age < 17) { 
      throw new AppError('É obrigatorio que o usuario seja maior de 17 anos.');
    }

    await enrollDAO.create({
      user: {
        ...user,
        ra: createRandomRa(),
        address: {
          ...user.address, 
          country: firstLetterUpperCase(user.address.country)
        }
      },
      courseId,
    })

    return res.status(201).json()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { user, status, courseId } = req.body;

    if (user.address.country.toLowerCase() !== 'brasil') {
      throw new AppError('É obrigatorio que usuario more no Brasil.');
    }

    await enrollDAO.update({
      user,
      status,
      courseId,
      enrollId: +id,
    })

    return res.status(200).send()
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await enrollDAO.delete(+id);

    return res.status(200).send()
  }
}

export default EnrollController;