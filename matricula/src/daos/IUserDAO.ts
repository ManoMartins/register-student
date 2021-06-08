import User from '../model/User';

export interface IUserDAO {
  list(): Promise<User[]>;
  index(id: number): Promise<User | null>;
  create({ address, name, genere, born, ra }: User): Promise<void>;
  update({ address, name, genere }: User): Promise<void>;
  delete(id: number): Promise<void>;
}