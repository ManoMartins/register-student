import { PrismaClient } from '@prisma/client';

import Course from '../../model/Course';
import { ICourseDAO } from '../ICourseDAO';

interface ICreateDTO {
  name: string;
  teacher: string;
  duration: number;
}

class CourseDAO implements ICourseDAO {
  private prisma = new PrismaClient();

  async list(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany()
    return courses
  }

  async delete(id: number): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }

  async index(id: number): Promise<Course | null> {
    const course = this.prisma.course.findUnique({ where: { id } })
    
    return course;
  }

  async update({ id, teacher, duration, name }: Course): Promise<void> {
    await this.prisma.course.update({
      where: { id },
      data: {
        name,
        teacher,
        duration,
      }
    })
  }

  async create({ name, duration, teacher }: ICreateDTO): Promise<void> {
    await this.prisma.course.create({
      data: {
        name,
        teacher,
        duration,
      }
    });
  }
}

export default CourseDAO;