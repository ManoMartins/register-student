import Course from './Course';
import User from './User';

class Enroll {
  id?: number;

  status!: string;

  course!: Course;

  user!: User;

  createAt!: Date;
}

export default Enroll;