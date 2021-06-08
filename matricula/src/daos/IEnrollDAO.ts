import { User, Address, Enroll as PrimaEnroll, Course } from ".prisma/client";

export interface ICreateEnrollDTO {
  user: User & { address: Address };
  courseId: number;
}

export interface Enroll extends PrimaEnroll {
  user: User,
  course: Course,
}

export interface IUpdateEnrollDTO {
  enrollId: number;
  courseId: number;
  status: string;
  user: Pick<User, 'name' | 'genere'> & { address: Address };
}

export interface IEnrollDAO {
  list(): Promise<Enroll[]>;
  delete(id: number): Promise<void>;
  index(id: number): Promise<Enroll | null>;
  create({ user, courseId }: ICreateEnrollDTO): Promise<void>;
  update({ user, status, enrollId, courseId }: IUpdateEnrollDTO): Promise<void>;
}