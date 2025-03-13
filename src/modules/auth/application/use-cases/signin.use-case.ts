import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import {
  AuthUserRepositoryToken,
  IAuthUserRepository,
} from '../../domain/repositories/auth-user.repository.interface';
import { AuthDTO } from '../../presentation/dto/auth.dto';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class SigninUseCase {
  constructor(
    @Inject(AuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async execute(dto: AuthDTO): Promise<void> {
    // ユーザーの新規作成
    const authUser = await AuthUser.create(dto.email, dto.password, dto.name);
    await this.authUserRepository.create(authUser);
  }
}
