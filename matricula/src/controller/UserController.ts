import { Request, Response } from "express";
import { getYear, parseISO } from 'date-fns';

import User from "../model/User";
import AppError from "../errors/AppError";
import UserDAO from "../daos/implementations/UserDAO";

const userDAO = new UserDAO();

class UserController {
  async list(req: Request, res: Response): Promise<void> {
    const users = await userDAO.list()

    res.json(users)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userDAO.index(+id);
  
    res.json(user)
  }

  async create(req: Request, res: Response) {
    const { name, born, genere, address } = req.body;
    
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(Math.random() * 99999) + 1

    const age = currentYear - getYear(parseISO(born));

    if (address.country.toLowerCase() !== 'brasil') {
      throw new AppError('É obrigatorio que usuario more no Brasil.');
    }

    if (age < 17) { 
      throw new AppError('É obrigatorio que usuario seja maior de 17 anos.');
    }
    
    const user = new User();
    
    Object.assign(user, {
      name,
      born,
      genere,
      ra: +`${currentYear}${randomNumber.toString().padStart(6, '0')}`,
      address,
    });
    
    await userDAO.create(user)

    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, genere, address, courseId } = req.body;

    if (address.country.toLowerCase() !== 'brasil') {
      throw new AppError('É obrigatorio que usuario more no Brasil.');
    }

    const user = new User();

    Object.assign(user, {
      id: +id,
      name,
      genere,
      address,
    })

    await userDAO.update(user);
    
    return res.status(201).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await userDAO.delete(+id);

    return res.send()
  }

}

export default UserController;