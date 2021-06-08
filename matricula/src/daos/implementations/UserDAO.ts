import { PrismaClient } from "@prisma/client";
import User from "../../model/User";
import { IUserDAO } from "../IUserDAO";

class UserDAO implements IUserDAO {
  private prisma = new PrismaClient();
  
  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        address: true,
        enroll: { 
          include: {
            course: true,
          }
        },
      }
    });

    return users as unknown as User[];
  }

  async index(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { 
        id,
      },
      include: {
        address: true,
        enroll: { 
          include: {
            course: true,
          }
        },
      }
    });

    return user as unknown as User;
  }

  async create({ address, name, genere, born, ra }: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ra,
        name,
        born,
        genere,
        address: {
          create: {
            zip: address.zip,
            city: address.city,
            state: address.state,
            street: address.street,
            number: address.number,
            country: address.country,
          }
        },
      }
    });
  }

  async update({ id, address, name, genere }: Pick<User, 'id' | 'address' | 'name' | 'genere'>): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        name,
        genere,
        address: {
          update: {
            zip: address.zip,
            city: address.city,
            state: address.state,
            street: address.street,
            number: address.number,
            country: address.country,
          }
        },
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export default UserDAO;