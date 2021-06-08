import { PrismaClient } from "@prisma/client";

import { ICreateEnrollDTO, IEnrollDAO, IUpdateEnrollDTO, Enroll } from "../IEnrollDAO";

class EnrollDAO implements IEnrollDAO {
  private prisma = new PrismaClient();

  async index(id: number): Promise<Enroll | null> {
    const enroll = await this.prisma.enroll.findUnique({ 
      where: { id },
      include: {
        course: true,
        user: {
          include: {
            address: true,
          }
        },
      },
    });

    return enroll
  }

  async list(): Promise<Enroll[]> {
    const enrolls = await this.prisma.enroll.findMany({
      include: {
        course: true,
        user: true,
      }
    });

    return enrolls
  }
  
  async create({ user, courseId }: ICreateEnrollDTO): Promise<void>{
    await this.prisma.enroll.create({
      data: {
        course: {
          connect: {
            id: courseId,
          }
        },
        user: {
          create: {
            name: user.name,
            born: user.born,
            genere: user.genere,
            ra: user.ra,
            address: {
              create: {
                street: user.address.street,
                number: user.address.number,
                state: user.address.state,
                city: user.address.city,
                country: user.address.country,
                zip: user.address.zip,
              }
            },
          },
        },
      }
    });
  }

  async update({ user, status, enrollId, courseId }: IUpdateEnrollDTO): Promise<void> {
    await this.prisma.enroll.update({
      where: { id: enrollId },
      data: {
        status,
        course:{ 
          connect: {
            id: courseId,
          }
        },
        user: {
          update: {
            name: user.name,
            genere: user.genere,  
            address: {
              update: {
                street: user.address.street,
                number: user.address.number,
                state: user.address.state,
                city: user.address.city,
                country: user.address.country,
                zip: user.address.zip,
              }
            }
          }
        },
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.enroll.delete({
      where: { id },
    });
  }
}

export default EnrollDAO