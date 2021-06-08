import Course from '../model/Course';

export interface ICourseDAO {
  list(): Promise<Course[]>;
  index(id: number): Promise<Course | null>;
  create({ name, duration, teacher }: Course): Promise<void>;
  update({ teacher, duration }: Course): Promise<void>;
  delete(id: number): Promise<void>;
}