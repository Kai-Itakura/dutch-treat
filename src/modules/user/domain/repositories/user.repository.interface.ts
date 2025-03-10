import { User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * 作成
   */
  create(user: User): Promise<void>;

  /**
   * 更新
   */
  update(user: User): Promise<void>;

  /**
   * 取得
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * 削除
   */
  delete(id: string): Promise<void>;
}

export const UserRepositoryToken = Symbol('IUserRepository');
